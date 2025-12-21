import threading
from typing import Dict, Optional


class StreamManager:
    def __init__(self):
        self._frames: Dict[str, bytes] = {}
        self._lock = threading.Lock()

    def set_frame(self, source_id: str, frame_bytes: bytes) -> None:
        with self._lock:
            self._frames[source_id] = frame_bytes

    def get_frame(self, source_id: str) -> Optional[bytes]:
        with self._lock:
            return self._frames.get(source_id)


stream_manager = StreamManager()
