from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional


class SourceResponse(BaseModel):
    id: UUID
    name: str
    camera_url: Optional[str]
    file_path: Optional[str]
    is_active: bool
    source_type: str
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class SourceCreateRequest(BaseModel):
    name: str
    camera_url: Optional[str] = None
    file_path: Optional[str] = None
    source_type: str = "camera"  # camera | video


class SourceUpdateRequest(BaseModel):
    name: Optional[str] = None
    camera_url: Optional[str] = None
    file_path: Optional[str] = None
    is_active: Optional[bool] = None
    source_type: Optional[str] = None


class ZoneResponse(BaseModel):
    id: UUID
    name: str
    source_id: UUID
    coordinates: dict
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class SourceProcessingResponse(BaseModel):
    source_id: UUID
    status: str
    message: str