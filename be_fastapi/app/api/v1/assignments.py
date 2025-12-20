from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from app.database.session import get_db
from app.service.assignment_service import AssignmentService
from app.schemas.assignment import (
    AssignmentRequest,
    AssignmentResponse,
    SourceAssignmentInfo,
    PoliceAssignmentInfo
)
from app.api.v1.dependencies import require_admin, require_police, get_current_user
from app.models.user import User

router = APIRouter(prefix="/assignments", tags=["assignments"])


@router.post("", response_model=AssignmentResponse, status_code=status.HTTP_200_OK)
async def assign_sources_to_police(
    request: AssignmentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Assign sources to a police user.
    Admin only endpoint.
    
    - Deletes old assignments for the police user
    - Inserts new assignments based on provided source_ids
    """
    try:
        result = AssignmentService.assign_sources_to_police(
            db=db,
            police_id=request.police_id,
            source_ids=request.source_ids
        )
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/police/{police_id}", response_model=list[SourceAssignmentInfo])
async def get_police_assignments(
    police_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get all sources assigned to a specific police user.
    Admin only endpoint.
    """
    try:
        assignments = AssignmentService.get_police_assignments(db, police_id)
        return assignments
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/my-sources", response_model=list[SourceAssignmentInfo])
async def get_my_assigned_sources(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_police)
):
    """
    Get all sources assigned to the current police user.
    Police only endpoint - used for dashboard filtering.
    """
    try:
        assignments = AssignmentService.get_police_assignments(db, current_user.id)
        return assignments
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/all", response_model=dict)
async def get_all_assignments(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get all assignments grouped by police user.
    Admin only endpoint.
    """
    try:
        assignments = AssignmentService.get_all_assignments(db)
        return assignments
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )
