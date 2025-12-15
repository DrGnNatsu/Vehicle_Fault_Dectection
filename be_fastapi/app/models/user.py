from sqlalchemy import Column, String, Boolean, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    full_name = Column(String)
    license_plate = Column(String, unique=True)
    is_active = Column(Boolean, nullable=False, server_default=text("TRUE"))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"), onupdate=text("NOW()"))
