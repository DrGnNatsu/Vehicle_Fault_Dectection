from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from app.database.session import get_db
from app.models.sources import Source
from app.models.zone import Zone
from app.models.user import User
from app.service.assignment_service import AssignmentService
from app.api.v1.dependencies import get_current_user, require_admin
from app.schemas.sources import SourceResponse, SourceCreateRequest, SourceUpdateRequest
from app.schemas.zone import ZoneResponse

router = APIRouter(prefix="/sources", tags=["sources"])


def _source_to_response(source: Source) -> SourceResponse:
    """Convert Source model to SourceResponse"""
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


def _zone_to_response(zone: Zone) -> ZoneResponse:
    """Convert Zone model to ZoneResponse"""
    return ZoneResponse(
        id=zone.id,
        name=zone.name,
        source_id=zone.source_id,
        coordinates=zone.coordinates,
        created_at=zone.created_at.isoformat() if zone.created_at else "",
        updated_at=zone.updated_at.isoformat() if zone.updated_at else ""
    )


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
    # Get user role
    user_role = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
    user_role = user_role.lower()
    
    # Admin sees all sources
    if user_role == "admin":
        sources = db.query(Source).filter(Source.is_active == True).all()
    # Police sees only assigned sources
    elif user_role == "police":
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
    
    return [_source_to_response(source) for source in sources]


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
    
    # Get user role
    user_role = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
    user_role = user_role.lower()
    
    # If police user, check if source is assigned to them
    if user_role == "police":
        assigned_source_ids = AssignmentService.get_assigned_source_ids(
            db, current_user.id
        )
        if source_id not in assigned_source_ids:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this source"
            )
    
    return _source_to_response(source)


# ============ CREATE SOURCE (Admin) ============
@router.post("", response_model=SourceResponse, status_code=status.HTTP_201_CREATED)
async def create_source(
    request: SourceCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Create a new source (camera_url or file_path).
    Admin only.
    """
    # Validate: must have either camera_url or file_path
    if not request.camera_url and not request.file_path:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Either camera_url or file_path must be provided"
        )
    
    # Check duplicate camera_url
    if request.camera_url:
        existing = db.query(Source).filter(Source.camera_url == request.camera_url).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Camera URL already exists")
    
    source = Source(
        name=request.name,
        camera_url=request.camera_url,
        file_path=request.file_path,
        source_type=request.source_type,
        uploaded_by=current_user.id,
        uploaded_at=datetime.utcnow()
    )
    
    db.add(source)
    db.commit()
    db.refresh(source)
    
    return _source_to_response(source)


# ============ UPDATE SOURCE (Admin) ============
@router.put("/{source_id}", response_model=SourceResponse)
async def update_source(
    source_id: UUID,
    request: SourceUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update an existing source.
    Admin only.
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    # Update fields if provided
    if request.name is not None:
        source.name = request.name
    if request.camera_url is not None:
        # Check duplicate
        existing = db.query(Source).filter(
            Source.camera_url == request.camera_url,
            Source.id != source_id
        ).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Camera URL already exists")
        source.camera_url = request.camera_url
    if request.file_path is not None:
        source.file_path = request.file_path
    if request.is_active is not None:
        source.is_active = request.is_active
    if request.source_type is not None:
        source.source_type = request.source_type
    
    db.commit()
    db.refresh(source)
    
    return _source_to_response(source)


# ============ DELETE SOURCE (Admin) ============
@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_source(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Delete a source (soft delete - set is_active=False).
    Admin only.
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    source.is_active = False
    db.commit()
    
    return None


# ============ GET ZONES BY SOURCE (Admin) ============
@router.get("/{source_id}/zones", response_model=List[ZoneResponse])
async def get_source_zones(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get all zones for a specific source.
    Admin only - used for UI drawing.
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    zones = db.query(Zone).filter(Zone.source_id == source_id).all()
    
    return [_zone_to_response(zone) for zone in zones]
