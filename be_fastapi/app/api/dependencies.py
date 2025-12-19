from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from app.database.session import get_db
from app.models.user import User


def get_current_user(
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get current user.
    In a real application, this would extract user from JWT token.
    For now, we'll use a simple approach with X-User-Id header.
    
    Usage: Include header "X-User-Id: <user_uuid>" in requests
    """
    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="X-User-Id header is required"
        )
    
    try:
        user_uuid = UUID(x_user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive"
        )
    
    return user


def require_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to require admin role.
    """
    if current_user.role.lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


def require_police(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to require police role.
    """
    if current_user.role.lower() != "police":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Police access required"
        )
    return current_user
