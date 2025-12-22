import asyncio
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from database.session import get_db
from models.sources import Source
from models.zone import Zone
from models.rule import Rule
from models.user import User
from service.assignment_service import AssignmentService
from api.v1.dependencies import get_current_user, require_admin, _ensure_source_access
from engine.ai.processing_manager import processing_manager
from sockets.stream_manager import stream_manager
from schemas.sources import SourceResponse, SourceCreateRequest, SourceUpdateRequest, SourceProcessingResponse
from schemas.zone import ZoneResponse
from schemas.rule import RuleCreateRequest, RuleResponse
from api.v1.rules import _rule_to_response



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
    current_user: User = Depends(get_current_user)
):
    """
    Get all zones for a specific source.
    - Admin: can see any source zones
    - Police: can only see assigned source zones
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    _ensure_source_access(source_id, current_user, db)
    
    zones = db.query(Zone).filter(Zone.source_id == source_id).all()
    
    return [_zone_to_response(zone) for zone in zones]


@router.post("/{source_id}/processing/start", response_model=SourceProcessingResponse)
async def start_source_processing(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Start background processing for a source (camera/rtsp/file)."""
    source = db.query(Source).filter(Source.id == source_id, Source.is_active == True).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found or inactive")

    _ensure_source_access(source_id, current_user, db)

    video_source = source.camera_url or source.file_path
    if not video_source:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Source is missing camera_url or file_path")

    started = processing_manager.start(str(source.id), video_source)
    if not started:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Processing already running for this source")

    return SourceProcessingResponse(
        source_id=source.id,
        status="running",
        message="Processing started"
    )


@router.post("/{source_id}/processing/stop", response_model=SourceProcessingResponse)
async def stop_source_processing(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Stop background processing for a source."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")

    _ensure_source_access(source_id, current_user, db)

    stopped = processing_manager.stop(str(source.id))
    if not stopped:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Processing is not running for this source")

    return SourceProcessingResponse(
        source_id=source.id,
        status="stopped",
        message="Processing stopped"
    )


@router.get("/{source_id}/stream")
async def stream_source_video(
    source_id: UUID,
    token: str = None, # Allow token in query param
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # Falls back to Header if no token? No, Depends runs first.
):
    # If token provided in query, we need to validate it manually if Depends failed? 
    # Actually, we should make `current_user` optional in signature and handle it manually, OR create a new dependency.
    pass 
    # RE-WRITING THE LOGIC BELOW TO AVOID DEPENDENCY CONFLICTS

    """MJPEG stream of the latest processed frames for a source."""
    source = db.query(Source).filter(Source.id == source_id, Source.is_active == True).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found or inactive")

    _ensure_source_access(source_id, current_user, db)

    boundary = "frame"
    source_id_str = str(source_id)

    async def frame_generator():
        while True:
            frame = stream_manager.get_frame(source_id_str)
            if frame:
                yield (
                    f"--{boundary}\r\n"
                    "Content-Type: image/jpeg\r\n"
                    f"Content-Length: {len(frame)}\r\n\r\n"
                ).encode("utf-8") + frame + b"\r\n"
            await asyncio.sleep(0.1)

    return StreamingResponse(
        frame_generator(),
        media_type=f"multipart/x-mixed-replace; boundary={boundary}"
    )

# ============ SOURCE RULES MANAGEMENT ============
@router.get("/{source_id}/rules", response_model=List[RuleResponse])
async def get_source_rules(
    source_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all rules assigned to this source.
    """
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    
    _ensure_source_access(source_id, current_user, db)
    
    return [_rule_to_response(rule) for rule in source.rules]


@router.post("/{source_id}/rules", response_model=RuleResponse)
async def create_source_rule(
    source_id: UUID,
    request: RuleCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a NEW rule and assign it to this source immediately.
    - Admin: can manage any source rules
    - Police: can manage assigned source rules
    """
    _ensure_source_access(source_id, current_user, db)
    
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")

    # Create new rule
    new_rule = Rule(
        name=request.name,
        dsl_content=request.dsl_content,
        created_by_id=current_user.id
    )
    db.add(new_rule)
    db.flush() # flush to get ID

    # Link to source
    source.rules.append(new_rule)
    
    db.commit()
    db.refresh(new_rule)
    
    return _rule_to_response(new_rule)


@router.delete("/{source_id}/rules/{rule_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_source_rule(
    source_id: UUID,
    rule_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Unassign and Delete a rule from a source.
    - Admin: can manage any source rules
    - Police: can manage assigned source rules
    """
    _ensure_source_access(source_id, current_user, db)
    
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
        
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Rule not found")

    if rule in source.rules:
        source.rules.remove(rule)
        # Optional: Delete the rule entirely since it's "source specific" logic
        # For now, let's also delete the rule itself to keep it clean, assuming 1-1 usage mostly
        db.delete(rule)
        
    db.commit()
    return None
