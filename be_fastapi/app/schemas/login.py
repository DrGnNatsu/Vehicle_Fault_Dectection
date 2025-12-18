from pydantic import BaseModel, Field
from pydantic import EmailStr

from app.enum.role import Role

"""
DTOs for user login functionality.
"""


class LoginResponseDTO(BaseModel):
    jwt_token: str
    token_type: str = "bearer"
    role: Role


class LoginRequestDTO(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
