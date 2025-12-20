from evaluator import DSLEvaluator
from shapely.geometry import Polygon

# Mock zones
zones = {
    "motorbike_lane": Polygon([(0,0), (1000,0), (1000,500), (0,500)]),
    "no_parking_zone": Polygon([(500,500), (800,500), (800,800), (500,800)])
}

scene = {"traffic_light_color": "red"}

# Test 6 vi phạm
tests = [
    # 1. Wrong lane
    ('IF object.class_name IN ("car", "bus", "truck") AND object.current_zone == "motorbike_lane" THEN TRIGGER_VIOLATION',
     {"class_name": "car", "current_zone": "motorbike_lane"}, True),
    
    # 2. Illegal parking
    ('IF object.speed_kmh < 5 AND object.zone_duration_seconds("no_parking_zone") > 10 SECONDS THEN TRIGGER_VIOLATION',
     {"speed_kmh": 2.0, "zone_duration_seconds": {"no_parking_zone": 15.0}}, True),
    
    # 3. Prohibited area
    ('IF object.class_name == "truck" AND object.current_zone == "prohibited_zone" THEN TRIGGER_VIOLATION',
     {"class_name": "truck", "current_zone": "prohibited_zone"}, True),
    
    # 4. Against traffic
    ('IF object.direction_angle > 150 AND object.direction_angle < 210 THEN TRIGGER_VIOLATION',
     {"direction_angle": 175.0}, True),
    
    # 5. Running red light
    ('IF scene.traffic_light_color == "red" AND object.speed_kmh > 10 THEN TRIGGER_VIOLATION',
     {"speed_kmh": 45.0}, True),
    
    # 6. No helmet
    ('IF object.class_name == "motorbike" AND object.attributes.has_helmet == false THEN TRIGGER_VIOLATION',
     {"class_name": "motorbike", "attributes": {"has_helmet": False}}, True),
]

for i, (dsl, obj, expected) in enumerate(tests, 1):
    evaluator = DSLEvaluator(obj, zones, scene if i == 5 else None)
    try:
        result = evaluator.evaluate(dsl)
        status = "PASS" if result == expected else "FAIL"
        print(f"Vi phạm {i}: {status} (expected {expected}, got {result})")
    except Exception as e:
        print(f"Vi phạm {i}: ERROR - {e}")