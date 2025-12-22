from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from uuid import UUID
import jwt
from jwt.exceptions import InvalidTokenError

from database.session import get_db
from models.user import User
from core.config import settings
from service.assignment_service import AssignmentService

# ... imports ...


def _ensure_source_access(source_id: UUID, current_user: User, db: Session):
    """Verify that the user can operate on the given source."""
    user_role = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
    user_role = user_role.lower()

    if user_role == "admin":
        return

    if user_role == "police":
        assigned_source_ids = AssignmentService.get_assigned_source_ids(db, current_user.id)
        if source_id not in assigned_source_ids:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this source"
            )
        return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You don't have access to this source"
    )

# OAuth2 scheme - tự động lấy token từ Authorization: Bearer <token>
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get current user from JWT token.
    Token must be in header: Authorization: Bearer <token>
    OR in query param: ?token=<token> (handled by custom logic if needed, but OAuth2PasswordBearer doesn't do it automatically)
    Wait, OAuth2PasswordBearer ONLY checks header.
    We need to make token optional there and check query manually?
    """
    # ... logic continues inside ...
    # WRONG APPROACH. OAuth2PasswordBearer raises 401 if header missing.
    # We must use a custom scheme or just use `Request` object.
    pass

# BETTER IMPLEMENTATION:
from fastapi import Request

async def get_token_from_header_or_query(request: Request) -> str:
    # Check header
    auth = request.headers.get("Authorization")
    if auth and auth.startswith("Bearer "):
        return auth.split(" ")[1]
    # Check query
    token = request.query_params.get("token")
    if token:
        return token
    raise HTTPException(status_code=401, detail="Not authenticated")

def get_current_user(
    token: str = Depends(get_token_from_header_or_query),
    db: Session = Depends(get_db)
) -> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode JWT token
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.HASH_ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    
    # Get user from database
    try:
        user_uuid = UUID(user_id)
    except ValueError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise credentials_exception
    
    if not user.is_active: # type: ignore
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