from sqlalchemy import Column, String, Boolean, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v7()"))
    name = Column(String, nullable=False)
    source_url = Column(String, nullable=False, unique=True)
    is_active = Column(Boolean, nullable=False, server_default=text("TRUE"))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("NOW()"))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("NOW()"))
