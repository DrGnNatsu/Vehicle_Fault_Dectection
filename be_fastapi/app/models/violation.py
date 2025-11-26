from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from .base import Base

class Violation(Base):
    __tablename__ = "violations"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v7()"))

    camera_id = Column(
        UUID(as_uuid=True),
        ForeignKey("cameras.id", ondelete="CASCADE"),
        nullable=False
    )

    rule_id = Column(
        UUID(as_uuid=True),
        ForeignKey("rules.id", ondelete="CASCADE"),
        nullable=False
    )

    timestamp = Column(TIMESTAMP(timezone=True), nullable=False)

    detected_license_plate = Column(String)

    evidence_url = Column(String, nullable=False)

    metadata_info = Column(JSONB)

