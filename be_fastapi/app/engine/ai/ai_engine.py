import json
import torch
import numpy as np
from datetime import datetime
from ultralytics import YOLO
from shapely.geometry import Point, Polygon
from collections import defaultdict
from sqlalchemy.orm import Session
from be_fastapi.app.database.session import SessionLocal
from be_fastapi.app.models.zone import Zone
from be_fastapi.app.engine.dsl.rule_engine import evaluate_frame
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VideoProcessor:
    def __init__(self, model_path='be_fastapi/app/engine/ckpt/best.pt', source_id=None):
        self.source_id = source_id
        self.device = 0 if torch.cuda.is_available() else 'cpu'
        logger.info(f"[Source {self.source_id}] Using device: {'GPU' if self.device == 0 else 'CPU'}")

        self.model = YOLO(model_path, task='detect')

        self.CLASS_NAMES = {
            0: 'Car', 1: 'Bus', 2: 'Truck', 3: 'Motorcycle',
            4: 'Person', 5: 'Traffic Light', 
            6: 'Helmet', 7: 'No Helmet', 8: 'License Plate'
        }
        
        self.VEHICLE_CLASSES = [0, 1, 2, 3]
        self.ATTRIBUTE_CLASSES = [6, 7, 8]
        
        self.zones = {}
        if self.source_id:
            self.load_zones_from_db(self.source_id)
        else:
            logger.warning("No source_id provided, cannot load zones.")
        
        # Memory cho tracking
        self.track_history = defaultdict(lambda: [])
        self.zone_entry_times = defaultdict(lambda: {})

    def load_zones_from_db(self, source_id):
        db: Session = SessionLocal()
        try:
            db_zones = db.query(Zone).filter(Zone.source_id == source_id).all()
            self.zones = {}
            for z in db_zones:
                try:
                    points = z.coordinates
                    if isinstance(points, str):
                        points = json.loads(points)
                    if points and isinstance(points, list) and len(points) >= 3:
                        poly = Polygon(points)
                        self.zones[z.name] = poly
                    else:
                        logger.warning(f"Zone '{z.name}' has invalid coordinates.")
                except Exception as e:
                    logger.error(f"Error parsing zone '{z.name}': {e}")
            logger.info(f"Loaded {len(self.zones)} zones for source {source_id}")
        except Exception as e:
            logger.error(f"Database error loading zones: {e}")
        finally:
            db.close()

    def calculate_iou(self, box1, box2):
        x1 = max(box1[0], box2[0])
        y1 = max(box1[1], box2[1])
        x2 = min(box1[2], box2[2])
        y2 = min(box1[3], box2[3])
        intersection = max(0, x2 - x1) * max(0, y2 - y1)
        area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
        area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
        if area1 + area2 - intersection == 0:
            return 0
        return intersection / (area1 + area2 - intersection)

    def estimate_speed(self, track_id, current_center):
        scale_factor = 0.05  # Có thể config từ DB sau
        if track_id not in self.track_history or len(self.track_history[track_id]) < 2:
            return 0.0
        prev_center = self.track_history[track_id][-1]
        pixel_dist = np.sqrt((current_center[0] - prev_center[0])**2 + (current_center[1] - prev_center[1])**2)
        speed_mps = pixel_dist * scale_factor * 30
        return round(speed_mps * 3.6, 1)

    def process_video(self, video_source):
        """
        video_source: str (file path) hoặc int (0 cho webcam) hoặc RTSP URL
        """
        import cv2
        cap = cv2.VideoCapture(video_source)
        if not cap.isOpened():
            logger.error(f"Cannot open video source: {video_source}")
            return

        logger.info(f"Starting processing for source {self.source_id} - {video_source}")
        
        frame_count = 0
        while True:
            success, frame = cap.read()
            if not success:
                logger.info("End of stream or cannot read frame")
                break

            frame_count += 1
            try:
                results = self.model.track(
                    frame,
                    persist=True,
                    tracker="bytetrack.yaml",
                    device=self.device,
                    verbose=False,
                    conf=0.2
                )

                boxes = results[0].boxes if results and results[0].boxes is not None else []
                current_timestamp = datetime.utcnow().isoformat() + "Z"

                vehicles = [box for box in boxes if int(box.cls[0]) in self.VEHICLE_CLASSES]
                attributes = [box for box in boxes if int(box.cls[0]) in self.ATTRIBUTE_CLASSES]

                dsl_objects = []
                for veh in vehicles:
                    if veh.id is None:
                        continue
                    track_id = int(veh.id[0])
                    cls_id = int(veh.cls[0])
                    x1, y1, x2, y2 = veh.xyxy[0].tolist()
                    center_point = Point((x1 + x2) / 2, (y1 + y2) / 2)
                    center_tuple = ((x1 + x2) / 2, (y1 + y2) / 2)

                    self.track_history[track_id].append(center_tuple)
                    if len(self.track_history[track_id]) > 30:
                        self.track_history[track_id].pop(0)

                    # Gắn attributes
                    has_helmet = None
                    license_text = "Unknown"
                    veh_box = [x1, y1, x2, y2]
                    for attr in attributes:
                        attr_box = attr.xyxy[0].tolist()
                        if self.calculate_iou(veh_box, attr_box) > 0.01:
                            attr_id = int(attr.cls[0])
                            if attr_id == 6: has_helmet = True
                            elif attr_id == 7: has_helmet = False
                            elif attr_id == 8: license_text = "DETECTED_PLATE"

                    # Zone detection
                    current_zone_name = None
                    zone_durations = {}
                    for z_name, z_poly in self.zones.items():
                        if z_poly.contains(center_point):
                            current_zone_name = z_name
                            if track_id not in self.zone_entry_times:
                                self.zone_entry_times[track_id] = {}
                            if z_name not in self.zone_entry_times[track_id]:
                                self.zone_entry_times[track_id][z_name] = datetime.now()
                            duration = (datetime.now() - self.zone_entry_times[track_id][z_name]).total_seconds()
                            zone_durations[z_name] = round(duration, 1)
                        else:
                            if track_id in self.zone_entry_times and z_name in self.zone_entry_times[track_id]:
                                del self.zone_entry_times[track_id][z_name]

                    obj_data = {
                        "track_id": track_id,
                        "class_name": self.CLASS_NAMES[cls_id],
                        "class_id": cls_id,
                        "bbox": [int(x1), int(y1), int(x2), int(y2)],
                        "confidence": float(veh.conf[0]),
                        "speed_kmh": self.estimate_speed(track_id, center_tuple),
                        "direction_angle": 0.0,
                        "current_zone": current_zone_name,
                        "zone_duration_seconds": zone_durations,
                        "attributes": {
                            "has_helmet": has_helmet,
                            "license_plate_text": license_text
                        }
                    }
                    dsl_objects.append(obj_data)

                final_json = {
                    "source_id": str(self.source_id),
                    "frame_timestamp": current_timestamp,
                    "objects": dsl_objects
                }

                db = SessionLocal()
                try:
                    violations = evaluate_frame(
                        db=db,
                        source_id=self.source_id,
                        ai_json=final_json,
                        current_frame=frame
                    )
                    if violations:
                        logger.info(f"Detected {len(violations)} violation(s) on source {self.source_id} - frame {frame_count}")
                except Exception as e:
                    logger.error(f"Error in rule evaluation: {e}")
                finally:
                    db.close()

            except Exception as e:
                logger.error(f"Error processing frame {frame_count}: {e}")
                continue

        cap.release()
        logger.info(f"Processing finished for source {self.source_id}")

if __name__ == "__main__":
    TEST_SOURCE_ID = 1
    MODEL_PATH = 'be_fastapi/app/engine/ckpt/best.pt'
    VIDEO_SOURCE = 'test_video.mp4'

    processor = VideoProcessor(model_path=MODEL_PATH, source_id=TEST_SOURCE_ID)
    processor.process_video(video_source=VIDEO_SOURCE)