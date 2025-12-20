# seed_data.py - Test đầy đủ 28 API

import uuid
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.user import User
from app.models.sources import Source
from app.models.zone import Zone
from app.models.rule import Rule
from app.models.violation import Violation
from app.models.source_rule import source_rules
from app.models.police_source_assignment import PoliceSourceAssignment
from app.utils.auth import get_password_hash

print("🌱 Starting seed data for full API testing...")

# ============ UUID CỐ ĐỊNH ============
ADMIN_ID = uuid.UUID("019b2c8d-115e-751d-9825-4704955e7f73")
POLICE_ID = uuid.UUID("019b2c8d-11a0-7985-bdac-27db1f4b69f1")
CUSTOMER_ID = uuid.UUID("019b2c8d-11c0-7985-bdac-27db1f4b69f3")

SOURCE_ID = uuid.UUID("019b2c8d-1211-7688-a110-31c03801452e")
SOURCE_ID_2 = uuid.UUID("019b2c8d-1212-7688-a110-31c03801452f")

ZONE_ID = uuid.UUID("019b2c8d-1222-7688-a110-31c03801453f")
ZONE_ID_2 = uuid.UUID("019b2c8d-1223-7688-a110-31c038014540")

RULE_ID = uuid.UUID("019b2c8d-1304-751d-9825-4704955e8004")
RULE_ID_2 = uuid.UUID("019b2c8d-1305-751d-9825-4704955e8005")

VIOLATION_ID_1 = uuid.UUID("019b2c8d-1401-751d-9825-4704955e8101")
VIOLATION_ID_2 = uuid.UUID("019b2c8d-1402-751d-9825-4704955e8102")
VIOLATION_ID_3 = uuid.UUID("019b2c8d-1403-751d-9825-4704955e8103")


def seed():
    db: Session = SessionLocal()
    try:
        # ============ 1. USERS ============
        users_data = [
            {
                "id": ADMIN_ID,
                "email": "admin@system.com",
                "password": "Admin@123",
                "role": "admin",
                "full_name": "Quản Trị Viên",
                "license_plate": None
            },
            {
                "id": POLICE_ID,
                "email": "police@system.com",
                "password": "Police@123",
                "role": "police",
                "full_name": "Cảnh Sát Giao Thông",
                "license_plate": None
            },
            {
                "id": CUSTOMER_ID,
                "email": "customer@system.com",
                "password": "Customer@123",
                "role": "user",
                "full_name": "Nguyễn Văn A",
                "license_plate": "51H-12345"
            },
        ]
        
        for data in users_data:
            user = db.query(User).filter(User.id == data["id"]).first()
            if not user:
                user = User(
                    id=data["id"],
                    email=data["email"],
                    hashed_password=get_password_hash(data["password"]),
                    role=data["role"],
                    full_name=data["full_name"],
                    license_plate=data["license_plate"],
                    is_active=True
                )
                db.add(user)
                print(f"   ➕ Created user: {data['email']} ({data['role']})")
            else:
                user.hashed_password = get_password_hash(data["password"])
                print(f"   ✓ Exists/Updated user: {data['email']} ({data['role']})")

        db.flush()

        # ============ 2. SOURCES (2 VIDEO) ============
        sources_data = [
            {
                "id": SOURCE_ID,
                "name": "Video Test - Không Đội Mũ Bảo Hiểm",
                "camera_url": None,
                "file_path": "videos/no_helmet.mp4",
                "source_type": "video",
            },
            {
                "id": SOURCE_ID_2,
                "name": "Video Test - Đậu Vùng Cấm",
                "camera_url": None,
                "file_path": "videos/dau_vung_cam.mp4",
                "source_type": "video",
            },
        ]
        
        for data in sources_data:
            source = db.query(Source).filter(Source.id == data["id"]).first()
            if not source:
                source = Source(
                    id=data["id"],
                    name=data["name"],
                    camera_url=data["camera_url"],
                    file_path=data["file_path"],
                    source_type=data["source_type"],
                    is_active=True,
                    uploaded_by=ADMIN_ID
                )
                db.add(source)
                print(f"   ➕ Created source: {data['name']}")
            else:
                source.file_path = data["file_path"]
                source.name = data["name"]
                print(f"   ✓ Updated source: {data['name']}")

        db.flush()

        # ============ 3. ZONES ============
        zones_data = [
            {
                "id": ZONE_ID,
                "source_id": SOURCE_ID,
                "name": "no_helmet_zone",
                "coordinates": {"points": [[129, 118], [138, 999], [1879, 975], [1866, 77]]}
            },
            {
                "id": ZONE_ID_2,
                "source_id": SOURCE_ID_2,
                "name": "vung_cam_zone",
                "coordinates": {"points": [[465, 685], [881, 698], [876, 239], [785, 239]]}
            },
        ]
        
        for data in zones_data:
            zone = db.query(Zone).filter(Zone.id == data["id"]).first()
            if not zone:
                zone = Zone(
                    id=data["id"],
                    source_id=data["source_id"],
                    name=data["name"],
                    coordinates=data["coordinates"]
                )
                db.add(zone)
                print(f"   ➕ Created zone: {data['name']}")
            else:
                zone.coordinates = data["coordinates"]
                print(f"   ✓ Updated zone: {data['name']}")

        db.flush()

        # ============ 4. RULES ============
        rules_data = [
            {
                "id": RULE_ID,
                "name": "Không đội mũ bảo hiểm",
                "dsl_content": '''IF object.class_name == "Motorcycle" 
AND object.current_zone == "no_helmet_zone" 
AND object.attributes.has_helmet == false 
THEN TRIGGER_VIOLATION'''
            },
            {
                "id": RULE_ID_2,
                "name": "Đậu xe vùng cấm",
                "dsl_content": '''IF object.class_name IN ["Car", "Motorcycle"] 
AND object.current_zone == "vung_cam_zone" 
AND object.is_stationary == true 
AND object.stationary_duration > 5 
THEN TRIGGER_VIOLATION'''
            },
        ]
        
        for data in rules_data:
            rule = db.query(Rule).filter(Rule.id == data["id"]).first()
            if not rule:
                rule = Rule(
                    id=data["id"],
                    name=data["name"],
                    dsl_content=data["dsl_content"],
                    is_active=True,
                    created_by_id=ADMIN_ID
                )
                db.add(rule)
                print(f"   ➕ Created rule: {data['name']}")
            else:
                rule.dsl_content = data["dsl_content"]
                print(f"   ✓ Updated rule: {data['name']}")

        db.flush()

        # ============ 5. SOURCE-RULE LINKS ============
        source_rule_links = [
            {"source_id": SOURCE_ID, "rule_id": RULE_ID},
            {"source_id": SOURCE_ID_2, "rule_id": RULE_ID_2},
        ]
        
        for link in source_rule_links:
            existing = db.execute(
                source_rules.select().where(
                    source_rules.c.source_id == link["source_id"],
                    source_rules.c.rule_id == link["rule_id"]
                )
            ).first()
            
            if not existing:
                db.execute(source_rules.insert().values(**link))
                print(f"   ➕ Linked rule to source")
            else:
                print(f"   ✓ Rule-source link exists")

        # ============ 6. POLICE-SOURCE ASSIGNMENTS ============
        for src_id in [SOURCE_ID, SOURCE_ID_2]:
            assignment = db.query(PoliceSourceAssignment).filter(
                PoliceSourceAssignment.user_id == POLICE_ID,
                PoliceSourceAssignment.source_id == src_id
            ).first()
            
            if not assignment:
                db.add(PoliceSourceAssignment(user_id=POLICE_ID, source_id=src_id))
                print(f"   ➕ Assigned source to police")
            else:
                print(f"   ✓ Assignment exists")

        db.flush()

        # ============ 7. VIOLATIONS ============
        violations_data = [
            {
                "id": VIOLATION_ID_1,
                "source_id": SOURCE_ID,
                "rule_id": RULE_ID,
                "timestamp": datetime.utcnow() - timedelta(hours=2),
                "detected_license_plate": "51H-12345",
                "evidence_url": "/static/evidence/no_helmet_001.jpg",
                "meta": {"confidence": 0.95, "violation_type": "no_helmet"}
            },
            {
                "id": VIOLATION_ID_2,
                "source_id": SOURCE_ID,
                "rule_id": RULE_ID,
                "timestamp": datetime.utcnow() - timedelta(hours=1),
                "detected_license_plate": "59A-67890",
                "evidence_url": "/static/evidence/no_helmet_002.jpg",
                "meta": {"confidence": 0.88, "violation_type": "no_helmet"}
            },
            {
                "id": VIOLATION_ID_3,
                "source_id": SOURCE_ID_2,
                "rule_id": RULE_ID_2,
                "timestamp": datetime.utcnow(),
                "detected_license_plate": "51H-12345",
                "evidence_url": "/static/evidence/vung_cam_001.jpg",
                "meta": {"confidence": 0.92, "violation_type": "parking_violation", "stationary_duration": 15}
            },
        ]
        
        for data in violations_data:
            violation = db.query(Violation).filter(Violation.id == data["id"]).first()
            if not violation:
                violation = Violation(
                    id=data["id"],
                    source_id=data["source_id"],
                    rule_id=data["rule_id"],
                    timestamp=data["timestamp"],
                    detected_license_plate=data["detected_license_plate"],
                    evidence_url=data["evidence_url"],
                    meta=data["meta"]
                )
                db.add(violation)
                print(f"   ➕ Created violation: {data['detected_license_plate']} - {data['meta']['violation_type']}")
            else:
                print(f"   ✓ Exists violation: {data['detected_license_plate']}")

        db.commit()
        
        print("\n" + "="*60)
        print("✅ SEED DATA HOÀN TẤT - SẴN SÀNG TEST 28 API!")
        print("="*60)
        print("\n📋 Test Accounts:")
        print("   Admin:    admin@system.com    / Admin@123")
        print("   Police:   police@system.com   / Police@123")
        print("   Customer: customer@system.com / Customer@123")
        print("\n📹 Video Sources:")
        print("   1. videos/no_helmet.mp4      - Zone: no_helmet_zone")
        print("   2. videos/dau_vung_cam.mp4   - Zone: vung_cam_zone")
        print("\n📜 Rules:")
        print("   1. Không đội mũ bảo hiểm")
        print("   2. Đậu xe vùng cấm")
        print("\n⚠️  Violations: 3 (2 no_helmet, 1 parking)")
        print("\n🧪 Test login:")
        print('   curl -X POST "http://localhost:8000/api/v1/auth/login" \\')
        print('     -H "Content-Type: application/json" \\')
        print('     -d \'{"email": "admin@system.com", "password": "Admin@123"}\'')
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Lỗi seed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    seed()