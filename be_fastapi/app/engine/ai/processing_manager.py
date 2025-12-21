import logging
import threading
from typing import Dict

from engine.ai.ai_engine import VideoProcessor

logger = logging.getLogger(__name__)


class ProcessingJob:
    def __init__(self, processor: VideoProcessor, thread: threading.Thread, stop_event: threading.Event):
        self.processor = processor
        self.thread = thread
        self.stop_event = stop_event


class VideoProcessingManager:
    def __init__(self):
        self.jobs: Dict[str, ProcessingJob] = {}
        self.lock = threading.Lock()

    def _cleanup_if_finished(self, source_id: str):
        job = self.jobs.get(source_id)
        if job and not job.thread.is_alive():
            self.jobs.pop(source_id, None)

    def start(self, source_id: str, video_source: str, model_path: str = "engine/ckpt/best.pt") -> bool:
        with self.lock:
            self._cleanup_if_finished(source_id)
            existing = self.jobs.get(source_id)
            if existing and existing.thread.is_alive():
                return False

            stop_event = threading.Event()
            processor = VideoProcessor(model_path=model_path, source_id=source_id, stop_event=stop_event)
            thread = threading.Thread(target=processor.process_video, args=(video_source,), daemon=True)
            self.jobs[source_id] = ProcessingJob(processor=processor, thread=thread, stop_event=stop_event)
            thread.start()
            logger.info(f"Started processing for source {source_id} with video source {video_source}")
            return True

    def stop(self, source_id: str) -> bool:
        with self.lock:
            job = self.jobs.get(source_id)
            if not job:
                return False
            job.stop_event.set()

        job.thread.join(timeout=5)
        with self.lock:
            if not job.thread.is_alive():
                self.jobs.pop(source_id, None)
                logger.info(f"Stopped processing for source {source_id}")
            else:
                logger.warning(f"Processing thread for source {source_id} is still running after stop request")
        return True

    def is_running(self, source_id: str) -> bool:
        with self.lock:
            job = self.jobs.get(source_id)
            if not job:
                return False
            if not job.thread.is_alive():
                self.jobs.pop(source_id, None)
                return False
            return True


processing_manager = VideoProcessingManager()
