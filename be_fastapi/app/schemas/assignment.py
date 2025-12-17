from pydantic import BaseModel, Field
from typing import List
from uuid import UUID


class AssignmentRequest(BaseModel):
    """Request schema for assigning sources to police"""
    police_id: UUID = Field(..., description="ID of the police user")
    source_ids: List[UUID] = Field(..., description="List of source IDs to assign")


class AssignmentResponse(BaseModel):
    """Response schema for assignment operation"""
    police_id: UUID
    assigned_source_ids: List[UUID]
    message: str


class SourceAssignmentInfo(BaseModel):
    """Schema for source assignment information"""
    source_id: UUID
    source_name: str
    source_type: str
    is_active: bool

    class Config:
        from_attributes = True


class PoliceAssignmentInfo(BaseModel):
    """Schema for police assignment information"""
    police_id: UUID
    police_name: str
    police_email: str
    assigned_sources: List[SourceAssignmentInfo]

    class Config:
        from_attributes = True
