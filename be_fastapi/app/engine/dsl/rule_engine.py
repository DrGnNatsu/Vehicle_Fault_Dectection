from sqlalchemy.orm import Session
from app.models.rule import Rule
from app.models.zone import Zone
from app.models.violation import Violation
from app.engine.dsl.evaluator import DSLEvaluator
from be_fastapi.app.utils.evidence.evidence import save_snapshot
from app.websockets.manager import manager
from shapely.geometry import Point, Polygon
from datetime import datetime
from uuid import uuid4
import logging
from app.models.source_rule import source_rules

logger = logging.getLogger(__name__)

def evaluate_frame(db: Session, source_id: str, ai_json: dict, current_frame) -> list[Violation]:
    violations = []
    
    # query rules assigned to source
    rules = (
        db.query(Rule)
        .join(source_rules, Rule.id == source_rules.c.rule_id)
        .filter(source_rules.c.source_id == source_id)
        .filter(Rule.is_active == True)
        .all()
    )
    if not rules:
        logger.info(f"No rules assigned to source {source_id}")
        return violations

    zones_query = db.query(Zone).filter(Zone.source_id == source_id).all()
    zones = {z.name: Polygon(z.coordinates) for z in zones_query}

    scene_data = ai_json.get("scene", {})

    for obj in ai_json.get("objects", []):
        if "current_zone" not in obj and zones:
            bbox = obj.get("bbox", [0,0,0,0])
            center_x = bbox[0] + bbox[2] / 2
            center_y = bbox[1] + bbox[3] / 2
            center_point = Point(center_x, center_y)
            for zone_name, poly in zones.items():
                if poly.contains(center_point):
                    obj["current_zone"] = zone_name
                    break
            else:
                obj["current_zone"] = None

        for rule in rules:
            try:
                evaluator = DSLEvaluator(obj, zones, scene_data)
                if evaluator.evaluate(rule.dsl_content):
                    violation = create_violation(db, source_id, rule.id, obj, current_frame)
                    violations.append(violation)
                    
                    alert = {
                        "type": "new_violation",
                        "violation_id": str(violation.id),
                        "source_id": source_id,
                        "rule_name": rule.name,
                        "timestamp": datetime.utcnow().isoformat(),
                        "object_class": obj.get("class_name"),
                        "zone_name": obj.get("current_zone"),
                        "evidence_snapshot": violation.evidence_url,
                        "license_plate": obj.get("attributes", {}).get("license_plate_text")
                    }
                    manager.broadcast(alert)
                    logger.info(f"Violation triggered: {rule.name} on source {source_id}")
            except Exception as e:
                logger.error(f"Error evaluating rule {rule.id}: {e}")
                continue

    return violations

def create_violation(db: Session, source_id: str, rule_id: str, obj: dict, frame) -> Violation:
    """Create record + evidence"""
    try:
        snapshot_path = save_snapshot(frame, obj.get("bbox"))
        if not snapshot_path:
            raise ValueError("Failed to save snapshot")
        
        violation = Violation(
            id=uuid4(),
            source_id=source_id,
            rule_id=rule_id,
            timestamp=datetime.utcnow(),
            detected_license_plate=obj.get("attributes", {}).get("license_plate_text"),
            evidence_url=snapshot_path,
            metadata={
                "class_name": obj.get("class_name"),
                "confidence": obj.get("confidence"),
                "bbox": obj.get("bbox"),
                "speed_kmh": obj.get("speed_kmh"),
                "direction_angle": obj.get("direction_angle"),
                "current_zone": obj.get("current_zone")
            }
        )
        db.add(violation)
        db.commit()
        db.refresh(violation)
        return violation
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to create violation: {e}")
        raise