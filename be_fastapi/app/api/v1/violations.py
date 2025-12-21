from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime, date

from database.session import get_db
from models.violation import Violation
from models.user import User
from service.assignment_service import AssignmentService
from api.v1.dependencies import get_current_user
from schemas.violation import ViolationResponse

router = APIRouter(prefix="/violations", tags=["violations"])


def _violation_to_response(v: Violation) -> ViolationResponse:
    """Convert Violation model to ViolationResponse"""
    return ViolationResponse(
        id=v.id,
        source_id=v.source_id,
        rule_id=v.rule_id,
        timestamp=v.timestamp.isoformat() if v.timestamp else "",
        detected_license_plate=v.detected_license_plate,
        evidence_url=v.evidence_url,
        metadata=v.meta or {}
    )


@router.get("", response_model=List[ViolationResponse])
async def get_violations(
    source_id: Optional[UUID] = Query(None, description="Filter by source ID"),
    rule_id: Optional[UUID] = Query(None, description="Filter by rule/type"),
    date_from: Optional[date] = Query(None, description="Filter from date"),
    date_to: Optional[date] = Query(None, description="Filter to date"),
    license_plate: Optional[str] = Query(None, description="Filter by license plate"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get violations with filters.
    - Admin: sees all violations
    - Police: sees violations from assigned sources
    - User/Customer: sees only their own violations (by license_plate)
    """
    query = db.query(Violation)
    
    # Role-based filtering
    user_role = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
    user_role = user_role.lower()
    
    if user_role == "police":
        # Police only sees violations from assigned sources
        assigned_source_ids = AssignmentService.get_assigned_source_ids(db, current_user.id)
        if not assigned_source_ids:
            return []
        query = query.filter(Violation.source_id.in_(assigned_source_ids))
    elif user_role == "user":
        # Customer only sees their own violations
        if not current_user.license_plate:
            return []
        query = query.filter(Violation.detected_license_plate == current_user.license_plate)
    elif user_role != "admin":
        return []
    
    # Apply filters
    if source_id:
        query = query.filter(Violation.source_id == source_id)
    if rule_id:
        query = query.filter(Violation.rule_id == rule_id)
    if date_from:
        query = query.filter(Violation.timestamp >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        query = query.filter(Violation.timestamp <= datetime.combine(date_to, datetime.max.time()))
    if license_plate:
        query = query.filter(Violation.detected_license_plate.ilike(f"%{license_plate}%"))
    
    # Order by timestamp descending
    query = query.order_by(Violation.timestamp.desc())
    
    violations = query.offset(skip).limit(limit).all()
    
    return [_violation_to_response(v) for v in violations]


@router.get("/my", response_model=List[ViolationResponse])
async def get_my_violations(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get violations for current user's license plate.
    Customer only.
    """
    if not current_user.license_plate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You don't have a registered license plate"
        )
    
    violations = db.query(Violation).filter(
        Violation.detected_license_plate == current_user.license_plate
    ).order_by(Violation.timestamp.desc()).offset(skip).limit(limit).all()
    
    return [_violation_to_response(v) for v in violations]


@router.get("/{violation_id}", response_model=ViolationResponse)
async def get_violation(
    violation_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get violation detail + evidence_url.
    Police/Customer can only see violations they have access to.
    """
    violation = db.query(Violation).filter(Violation.id == violation_id).first()
    if not violation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Violation not found")
    
    # Check access
    user_role = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
    user_role = user_role.lower()
    
    if user_role == "police":
        assigned_source_ids = AssignmentService.get_assigned_source_ids(db, current_user.id)
        if violation.source_id not in assigned_source_ids:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    elif user_role == "user":
        if violation.detected_license_plate != current_user.license_plate:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    return _violation_to_response(violation)
