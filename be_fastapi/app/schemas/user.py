from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID


class UserResponse(BaseModel):
    id: UUID
    email: str
    role: str
    full_name: Optional[str] = None
    license_plate: Optional[str] = None
    is_active: bool
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    role: str  # police | user
    full_name: Optional[str] = None
    license_plate: Optional[str] = None


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    license_plate: Optional[str] = None
