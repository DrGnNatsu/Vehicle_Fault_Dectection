from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from database.session import get_db
from models.zone import Zone
from models.sources import Source
from models.user import User
from api.v1.dependencies import get_current_user, require_admin, _ensure_source_access
from schemas.zone import ZoneResponse, ZoneCreateRequest, ZoneUpdateRequest

router = APIRouter(prefix="/zones", tags=["zones"])


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


@router.get("", response_model=List[ZoneResponse])
async def get_zones(
    source_id: Optional[UUID] = Query(None, description="Filter by source ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all zones, optionally filtered by source.
    - Admin: can see any zones
    - Police: can only see assigned source zones (if filtered by source)
    """
    if source_id:
        _ensure_source_access(source_id, current_user, db)
    elif current_user.role.lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required to list all zones"
        )
    query = db.query(Zone)
    
    if source_id:
        query = query.filter(Zone.source_id == source_id)
    
    zones = query.all()
    return [_zone_to_response(zone) for zone in zones]


@router.get("/{zone_id}", response_model=ZoneResponse)
async def get_zone(
    zone_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific zone by ID.
    - Admin: can see any zone
    - Police: can only see assigned source zones
    """
    zone = db.query(Zone).filter(Zone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Zone not found")
    
    _ensure_source_access(zone.source_id, current_user, db)
    
    return _zone_to_response(zone)


@router.post("", response_model=ZoneResponse, status_code=status.HTTP_201_CREATED)
async def create_zone(
    request: ZoneCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new zone (coordinates + source_id).
    - Admin: can manage any source zones
    - Police: can manage assigned source zones
    """
    _ensure_source_access(request.source_id, current_user, db)
    # Validate source exists
    source = db.query(Source).filter(Source.id == request.source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    zone = Zone(
        name=request.name,
        source_id=request.source_id,
        coordinates=request.coordinates
    )
    
    db.add(zone)
    db.commit()
    db.refresh(zone)
    
    return _zone_to_response(zone)


@router.put("/{zone_id}", response_model=ZoneResponse)
async def update_zone(
    zone_id: UUID,
    request: ZoneUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update zone (coordinates).
    - Admin: can manage any source zones
    - Police: can manage assigned source zones
    """
    zone = db.query(Zone).filter(Zone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Zone not found")
    
    _ensure_source_access(zone.source_id, current_user, db)
    
    if request.name is not None:
        zone.name = request.name
    if request.coordinates is not None:
        zone.coordinates = request.coordinates
    
    db.commit()
    db.refresh(zone)
    
    return _zone_to_response(zone)


@router.delete("/{zone_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_zone(
    zone_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a zone.
    - Admin: can manage any source zones
    - Police: can manage assigned source zones
    """
    zone = db.query(Zone).filter(Zone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Zone not found")
    
    _ensure_source_access(zone.source_id, current_user, db)
    
    db.delete(zone)
    db.commit()
    
    return None
