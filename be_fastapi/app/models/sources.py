from sqlalchemy import Column, String, Boolean, TIMESTAMP, text, ForeignKey, Integer, Index
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class Source(Base):
    __tablename__ = "sources"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))
    name = Column(String, nullable=False, index=True)
    camera_url = Column(String, nullable=True, unique=True, index=True)
    file_path = Column(String, nullable=True, index=True)
    is_active = Column(Boolean, nullable=False, server_default=text("TRUE"))
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    uploaded_at = Column(TIMESTAMP(timezone=True), nullable=True)
    duration = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("NOW()"))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("NOW()"), onupdate=text("NOW()"))
    source_type = Column(String, nullable=False, server_default=text("'camera'"), index=True)
    __table_args__ = (
        Index('ix_sources_source_type', 'source_type'),
        Index('ix_sources_is_active', 'is_active'),
    )