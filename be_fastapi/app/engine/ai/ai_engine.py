import json
import torch
import numpy as np
import argparse
import threading
from datetime import datetime
from typing import Optional
from ultralytics import YOLO # type: ignore
from shapely.geometry import Point, Polygon
from collections import defaultdict
from sqlalchemy.orm import Session
from database.session import SessionLocal
from models.zone import Zone
from engine.dsl.rule_engine import evaluate_frame
from sockets.stream_manager import stream_manager
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VideoProcessor:
    def __init__(
        self,
        model_path: str = 'engine/ckpt/best.pt',
        source_id=None,
        stop_event: Optional[threading.Event] = None
    ):
        self.source_id = source_id
        self.device = 0 if torch.cuda.is_available() else 'cpu'
        self.stop_event = stop_event or threading.Event()
        logger.info(f"[Source {self.source_id}] Using device: {'GPU' if self.device == 0 else 'CPU'}")

        self.model = YOLO(model_path, task='detect')

        self.CLASS_NAMES = {
            0: 'Car', 1: 'Bus', 2: 'Truck', 3: 'Motorcycle',
            4: 'Person', 5: 'Traffic Light', 
            6: 'Helmet', 7: 'No Helmet', 8: 'License Plate'
        }
        
        self.zones = {}
        self.zone_points = {}
        self.zone_centroids = {}
        if self.source_id:
            self.load_zones_from_db(self.source_id)
        else:
            logger.warning("No source_id provided, cannot load zones.")

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
                    
                    # Handle dict format from seed data {"points": [...]}
                    if isinstance(points, dict) and "points" in points:
                        points = points["points"]

                    if points and isinstance(points, list) and len(points) >= 3: # type: ignore
                        poly = Polygon(points)
                        self.zones[z.name] = poly
                        int_points = [(int(p[0]), int(p[1])) for p in points]
                        self.zone_points[z.name] = int_points
                        centroid = poly.centroid
                        self.zone_centroids[z.name] = (int(centroid.x), int(centroid.y))
                    else:
                        logger.warning(f"Zone '{z.name}' has invalid coordinates.")
                except Exception as e:
                    logger.error(f"Error parsing zone '{z.name}': {e}")
            logger.info(f"Loaded {len(self.zones)} zones for source {source_id}")
        except Exception as e:
            logger.error(f"Database error loading zones: {e}")
        finally:
            db.close()

    def get_zone_for_point(self, x, y):
        point = Point(x, y)
        for z_name, z_poly in self.zones.items():
            if z_poly.contains(point):
                return z_name
        return None

    def request_stop(self):
        self.stop_event.set()

    def _draw_zones(self, frame):
        import cv2
        if not self.zone_points:
            return
        for name, pts in self.zone_points.items():
            if len(pts) < 3:
                continue
            cv2.polylines(frame, [np.array(pts, dtype=np.int32)], isClosed=True, color=(255, 0, 0), thickness=2)
            centroid = self.zone_centroids.get(name)
            if centroid:
                cv2.putText(frame, name, centroid, cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2, cv2.LINE_AA)

    def _draw_detections(self, frame, dsl_objects, violating_bboxes=None):
        import cv2
        violating_bboxes = violating_bboxes or set()
        for obj in dsl_objects:
            bbox = obj.get("bbox") or []
            if len(bbox) != 4:
                continue
            x1, y1, x2, y2 = bbox
            class_name = obj.get("class_name", "")
            zone_name = obj.get("current_zone")
            label = class_name if not zone_name else f"{class_name} @ {zone_name}"
            color = (0, 255, 0)
            if tuple(bbox) in violating_bboxes:
                color = (0, 0, 255)
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
            cv2.putText(frame, label, (int(x1), max(int(y1) - 10, 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2, cv2.LINE_AA)

    def process_video(self, video_source):
        import cv2
        import os

        # Try to resolve video path if file not found
        if not os.path.exists(video_source):
             # Try going up one level (common in this project structure: app/ vs videos/)
             alt_path = os.path.join("..", video_source)
             if os.path.exists(alt_path):
                 logger.info(f"Resolved video path from '{video_source}' to '{alt_path}'")
                 video_source = alt_path

        cap = cv2.VideoCapture(video_source)
        if not cap.isOpened():
            logger.error(f"Cannot open video source: {video_source}")
            return

        logger.info(f"Starting processing for source {self.source_id} - {video_source}")
        
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        logger.info(f"Video info: {total_frames} frames, {fps} FPS")
        
        frame_count = 0
        total_violations = 0
        
        while True:
            if self.stop_event.is_set():
                logger.info(f"Stop signal received for source {self.source_id}")
                break
            success, frame = cap.read()
            if self.stop_event.is_set():
                logger.info(f"Stop signal received after frame read for source {self.source_id}")
                break
            if not success:
                logger.info(f"End of stream after {frame_count} frames")
                break

            frame_count += 1
            if frame_count % 100 == 0:
                logger.info(f"Processing frame {frame_count}/{total_frames}")
            
            try:
                results = self.model.track(
                    frame,
                    persist=True,
                    tracker="bytetrack.yaml",
                    device=self.device,
                    verbose=False,
                    conf=0.25
                )

                if not results or results[0].boxes is None:
                    continue
                    
                boxes = results[0].boxes
                current_timestamp = datetime.utcnow().isoformat() + "Z"

                dsl_objects = []
                for box in boxes:
                    cls_id = int(box.cls[0])
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    center_x = (x1 + x2) / 2
                    center_y = (y1 + y2) / 2
                    conf = float(box.conf[0])
                    track_id = int(box.id[0]) if box.id is not None else None

                    zone_name = self.get_zone_for_point(center_x, center_y)
                    
                    obj_data = {
                        "track_id": track_id,
                        "class_name": self.CLASS_NAMES.get(cls_id, f"Unknown({cls_id})"),
                        "class_id": cls_id,
                        "bbox": [int(x1), int(y1), int(x2), int(y2)],
                        "confidence": conf,
                        "current_zone": zone_name,
                        "attributes": {}
                    }
                    dsl_objects.append(obj_data)

                final_json = {
                    "source_id": str(self.source_id),
                    "frame_timestamp": current_timestamp,
                    "objects": dsl_objects
                }

                db = SessionLocal()
                violating_bboxes = set()
                try:
                    violations = evaluate_frame(
                        db=db,
                        source_id=self.source_id, # type: ignore
                        ai_json=final_json,
                        current_frame=frame
                    )
                    if violations:
                        for v in violations:
                            try:
                                bbox = v.metadata.get("bbox") if v.metadata else None
                                if bbox and isinstance(bbox, list) and len(bbox) == 4:
                                    violating_bboxes.add(tuple(int(x) for x in bbox))
                            except Exception:
                                continue
                        total_violations += len(violations)
                        logger.warning(f"Frame {frame_count}: {len(violations)} violation(s) detected!")
                except Exception as e:
                    logger.error(f"Error in rule evaluation: {e}")
                finally:
                    db.close()

            except Exception as e:
                logger.error(f"Error processing frame {frame_count}: {e}")
                continue

            try:
                display_frame = frame.copy()
                self._draw_zones(display_frame)
                self._draw_detections(display_frame, dsl_objects, violating_bboxes)
                ok, buffer = cv2.imencode('.jpg', display_frame)
                if ok:
                    stream_manager.set_frame(str(self.source_id), buffer.tobytes())
            except Exception as e:
                logger.error(f"Failed to encode/send frame for source {self.source_id}: {e}")

        cap.release()
        logger.info(f"Processing finished for source {self.source_id}")
        logger.info(f"Total violations detected: {total_violations}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Video Processor for Vehicle Fault Detection")
    parser.add_argument("--source_id", type=str, required=True, help="Source ID (UUID) from database")
    parser.add_argument("--video_source", type=str, required=True, help="Video file path or RTSP URL")
    parser.add_argument("--model_path", type=str, default="app/engine/ckpt/best.pt", help="Path to YOLO model")
    
    args = parser.parse_args()
    
    processor = VideoProcessor(model_path=args.model_path, source_id=args.source_id)
    processor.process_video(video_source=args.video_source)