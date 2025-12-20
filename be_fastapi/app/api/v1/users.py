from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database.session import get_db
from app.models.user import User
from app.api.v1.dependencies import require_admin
from app.utils.auth import get_password_hash, is_password_valid
from app.schemas.user import UserResponse, UserCreateRequest, UserUpdateRequest

router = APIRouter(prefix="/users", tags=["users"])


def _user_to_response(user: User) -> UserResponse:
    """Convert User model to UserResponse"""
    return UserResponse(
        id=user.id,
        email=user.email,
        role=user.role.value if hasattr(user.role, 'value') else str(user.role),
        full_name=user.full_name,
        license_plate=user.license_plate,
        is_active=user.is_active,
        created_at=user.created_at.isoformat() if user.created_at else "",
        updated_at=user.updated_at.isoformat() if user.updated_at else ""
    )


@router.get("", response_model=List[UserResponse])
async def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get all users.
    Admin only.
    """
    users = db.query(User).all()
    return [_user_to_response(user) for user in users]


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get a specific user by ID.
    Admin only.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return _user_to_response(user)


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    request: UserCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Create a new user (police or customer).
    Admin only.
    """
    # Check email exists
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    # Validate role
    if request.role not in ["police", "user"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role must be 'police' or 'user'")
    
    # Validate password
    if not is_password_valid(request.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters with uppercase, lowercase, digit and special character"
        )
    
    # Check license_plate unique if provided
    if request.license_plate:
        existing_plate = db.query(User).filter(User.license_plate == request.license_plate).first()
        if existing_plate:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="License plate already registered")
    
    user = User(
        email=request.email,
        hashed_password=get_password_hash(request.password),
        role=request.role,
        full_name=request.full_name,
        license_plate=request.license_plate
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return _user_to_response(user)


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: UUID,
    request: UserUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update user (role, active status).
    Admin only.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if request.full_name is not None:
        user.full_name = request.full_name
    if request.role is not None:
        if request.role not in ["admin", "police", "user"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role")
        user.role = request.role
    if request.is_active is not None:
        user.is_active = request.is_active
    if request.license_plate is not None:
        # Check unique
        existing = db.query(User).filter(
            User.license_plate == request.license_plate,
            User.id != user_id
        ).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="License plate already registered")
        user.license_plate = request.license_plate
    
    db.commit()
    db.refresh(user)
    
    return _user_to_response(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Soft delete a user (set is_active=False).
    Admin only.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Prevent deleting self
    if user.id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot delete yourself")
    
    user.is_active = False
    db.commit()
    
    return None
