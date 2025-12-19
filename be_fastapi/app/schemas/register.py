from pydantic import BaseModel, Field
from pydantic import EmailStr

"""
DTOs for user register functionality.
"""


class RegisterResponseDTO(BaseModel):
    message: str


class RegisterRequestDTO(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
    confirm_password: str = Field(..., min_length=1)


class RegisterCreateUserDTO(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
