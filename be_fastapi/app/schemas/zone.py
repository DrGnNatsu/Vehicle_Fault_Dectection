from pydantic import BaseModel
from typing import Optional, List, Any
from uuid import UUID


class ZoneResponse(BaseModel):
    id: UUID
    name: str
    source_id: UUID
    coordinates: Any  # JSONB - có thể là list hoặc dict
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class ZoneCreateRequest(BaseModel):
    name: str
    source_id: UUID
    coordinates: Any  # {"points": [[x1,y1], [x2,y2], ...]} hoặc [[x1,y1], [x2,y2], ...]


class ZoneUpdateRequest(BaseModel):
    name: Optional[str] = None
    coordinates: Optional[Any] = None
