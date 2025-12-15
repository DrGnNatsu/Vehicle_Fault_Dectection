from sqlalchemy import Column, TIMESTAMP, ForeignKey, text, Index, String
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from .base import Base


class Violation(Base):
    __tablename__ = "violations"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))

    source_id = Column(
        UUID(as_uuid=True),
        ForeignKey("sources.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    
    rule_id = Column(
        UUID(as_uuid=True),
        ForeignKey("rules.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    timestamp = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now(), 
        index=True,             
    )

    detected_license_plate = Column(String, index=True)
    evidence_url = Column(String, nullable=False)

    meta = Column("metadata", JSONB, nullable=False, server_default=text("'{}'::jsonb")) # type: ignore

    __table_args__ = (
        Index('ix_violations_source_timestamp', source_id, timestamp.desc()),
    )