"""init db schema

Revision ID: 800c9bcd8d18
Revises: 
Create Date: 2025-11-17 07:55:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '800c9bcd8d18'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ==============================
    #  EXTENSIONS
    # ==============================
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
    
    # ==============================
    #  CREATE UUID_GENERATE_V7 FUNCTION
    # ==============================
    op.execute("""
        CREATE OR REPLACE FUNCTION uuid_generate_v7() RETURNS uuid AS $$
            SELECT encode(
                set_byte(
                    set_byte(
                        gen_random_bytes(16),
                        6,
                        (get_byte(gen_random_bytes(1), 0) & 15) | 112
                    ),
                    8,
                    (get_byte(gen_random_bytes(1), 0) & 63) | 128
                ),
                'hex'
            )::uuid;
        $$ LANGUAGE SQL IMMUTABLE;
    """)



    # ==============================
    #  TABLE: users
    # ==============================
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v7()")),
        sa.Column('email', sa.Text(), nullable=False, unique=True),
        sa.Column('hashed_password', sa.Text(), nullable=False),
        sa.Column('role', sa.Text(), nullable=False),
        sa.Column('full_name', sa.Text()),
        sa.Column('license_plate', sa.Text(), unique=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text("TRUE")),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.CheckConstraint("role IN ('admin', 'police', 'customer')", name="users_role_check")
    )

    # ==============================
    #  TABLE: cameras
    # ==============================
    op.create_table(
        'cameras',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v7()")),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('source_url', sa.Text(), nullable=False, unique=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text("TRUE")),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()"))
    )

    # ==============================
    #  TABLE: rules
    # ==============================
    op.create_table(
        'rules',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v7()")),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('dsl_content', sa.Text(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text("TRUE")),
        sa.Column('created_by_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete="SET NULL")),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
    )

    # ==============================
    #  TABLE: zones
    # ==============================
    op.create_table(
        'zones',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v7()")),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('camera_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('cameras.id', ondelete="CASCADE"), nullable=False),
        sa.Column('coordinates', postgresql.JSONB(), nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("NOW()")),
    )

    # ==============================
    #  TABLE: violations
    # ==============================
    op.create_table(
        'violations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v7()")),
        sa.Column('camera_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('cameras.id', ondelete="CASCADE"), nullable=False),
        sa.Column('rule_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('rules.id', ondelete="CASCADE"), nullable=False),
        sa.Column('timestamp', sa.TIMESTAMP(timezone=True), nullable=False),
        sa.Column('detected_license_plate', sa.Text()),
        sa.Column('evidence_url', sa.Text(), nullable=False),
        sa.Column('metadata', postgresql.JSONB()),
    )

    # ==============================
    #  TABLE: police_camera_assignments
    # ==============================
    op.create_table(
        'police_camera_assignments',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete="CASCADE"), primary_key=True),
        sa.Column('camera_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('cameras.id', ondelete="CASCADE"), primary_key=True),
    )


def downgrade():
    op.drop_table('police_camera_assignments')
    op.drop_table('violations')
    op.drop_table('zones')
    op.drop_table('rules')
    op.drop_table('cameras')
    op.drop_table('users')