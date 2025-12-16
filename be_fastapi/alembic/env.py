import os
import sys
from logging.config import fileConfig

# ensure alembic can import app/ - PHẢI CHẠY TRƯỚC KHI IMPORT APP
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# load .env
from dotenv import load_dotenv
load_dotenv()

from alembic import context
from sqlalchemy import create_engine
from app.core.config import settings

from app.models.base import Base
import app.models.user
import app.models.sources
import app.models.zone
import app.models.rule
import app.models.violation
import app.models.police_source_assignment


config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_offline():
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    engine = create_engine(settings.DATABASE_URL)
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
