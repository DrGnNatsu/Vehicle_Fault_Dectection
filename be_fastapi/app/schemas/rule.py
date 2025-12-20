from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class RuleResponse(BaseModel):
    id: UUID
    name: str
    dsl_content: str
    is_active: bool
    created_by_id: Optional[UUID] = None
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class RuleCreateRequest(BaseModel):
    name: str
    dsl_content: str


class RuleUpdateRequest(BaseModel):
    name: Optional[str] = None
    dsl_content: Optional[str] = None
    is_active: Optional[bool] = None
