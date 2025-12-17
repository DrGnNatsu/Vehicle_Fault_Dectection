from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.database.session import get_db
from app.models.sources import Source
from app.models.user import User
from app.service.assignment_service import AssignmentService
from app.api.dependencies import get_current_user, require_police, require_admin
from pydantic import BaseModel

router = APIRouter(prefix="/api/sources", tags=["sources"])


class SourceResponse(BaseModel):
    """Response schema for source"""
    id: UUID
    name: str
    camera_url: Optional[str]
    file_path: Optional[str]
    is_active: bool
    source_type: str
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


@router.get("", response_model=List[SourceResponse])
async def get_sources(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get sources.
    - Admin: sees all active sources
    - Police: sees only assigned sources (filtered by assignment)
    """
    # Admin sees all sources
    if current_user.role.lower() == "admin":
        sources = db.query(Source).filter(Source.is_active == True).all()
    # Police sees only assigned sources
    elif current_user.role.lower() == "police":
        assigned_source_ids = AssignmentService.get_assigned_source_ids(
            db, current_user.id
        )
        if not assigned_source_ids:
            # No assignments, return empty list
            return []
        sources = db.query(Source).filter(
            Source.id.in_(assigned_source_ids),
            Source.is_active == True
        ).all()
    else:
        # Other roles see no sources
        return []
    
    return [
        SourceResponse(
            id=source.id,
            name=source.name,
            camera_url=source.camera_url,
            file_path=source.file_path,
            is_active=source.is_active,
            source_type=source.source_type,
            created_at=source.created_at.isoformat() if source.created_at else "",
            updated_at=source.updated_at.isoformat() if source.updated_at else ""
        )
        for source in sources
    ]


@router.get("/{source_id}", response_model=SourceResponse)
async def get_source(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific source by ID.
    - Admin: can see any source
    - Police: can only see assigned sources
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    
    if not source:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Source not found"
        )
    
    # If police user, check if source is assigned to them
    if current_user.role.lower() == "police":
        assigned_source_ids = AssignmentService.get_assigned_source_ids(
            db, current_user.id
        )
        if source_id not in assigned_source_ids:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this source"
            )
    
    return SourceResponse(
        id=source.id,
        name=source.name,
        camera_url=source.camera_url,
        file_path=source.file_path,
        is_active=source.is_active,
        source_type=source.source_type,
        created_at=source.created_at.isoformat() if source.created_at else "",
        updated_at=source.updated_at.isoformat() if source.updated_at else ""
    )
