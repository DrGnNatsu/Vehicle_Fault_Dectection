from sqlalchemy import Column, ForeignKey, Table
from .base import Base
from sqlalchemy.dialects.postgresql import UUID

source_rules = Table(
    "source_rules",
    Base.metadata,
    Column("source_id", UUID(as_uuid=True), ForeignKey("sources.id"), primary_key=True),
    Column("rule_id", UUID(as_uuid=True), ForeignKey("rules.id"), primary_key=True)
)