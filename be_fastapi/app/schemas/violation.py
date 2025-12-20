from pydantic import BaseModel
from typing import Optional, Any
from uuid import UUID


class ViolationResponse(BaseModel):
    id: UUID
    source_id: UUID
    rule_id: UUID
    timestamp: str
    detected_license_plate: Optional[str] = None
    evidence_url: str
    metadata: Any = {}

    class Config:
        from_attributes = True


class ViolationListResponse(BaseModel):
    violations: list[ViolationResponse]
    total: int
    skip: int
    limit: int
