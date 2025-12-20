import cv2
import os
from datetime import datetime
import uuid
EVIDENCE_DIR = "evidence/snapshots"
os.makedirs(EVIDENCE_DIR, exist_ok=True)

def save_snapshot(frame, bbox) -> str:
    if frame is None:
        return None

    annotated = frame.copy()
    
    if bbox and len(bbox) == 4:
        x1, y1, x2, y2 = map(int, bbox)
        cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 4)
        cv2.putText(annotated, "VIOLATION", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 3)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"violation_{timestamp}_{uuid.uuid4().hex[:8]}.jpg"
    filepath = os.path.join(EVIDENCE_DIR, filename)

    success = cv2.imwrite(filepath, annotated)
    if not success:
        return None
    return f"/evidence/snapshots/{filename}"