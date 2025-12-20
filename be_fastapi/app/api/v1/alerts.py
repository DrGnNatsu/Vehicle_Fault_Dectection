from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from sqlalchemy.orm import Session
import jwt
from jwt.exceptions import InvalidTokenError
from uuid import UUID
import logging

from app.database.session import get_db
from app.models.user import User
from app.core.config import settings
from app.websockets.manager import manager
from app.service.assignment_service import AssignmentService

logger = logging.getLogger(__name__)

router = APIRouter(tags=["websocket"])


async def get_user_from_token(token: str, db: Session) -> User | None:
    """Validate JWT token and return user."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.HASH_ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            return None
        user = db.query(User).filter(User.id == UUID(user_id)).first()
        return user
    except (InvalidTokenError, ValueError):
        return None


@router.websocket("/ws/alerts")
async def websocket_alerts(
    websocket: WebSocket,
    token: str = Query(..., description="JWT token for authentication")
):
    """
    WebSocket endpoint for realtime violation alerts.
    
    Connect with: ws://localhost:8000/ws/alerts?token=<jwt_token>
    
    - Police: receives alerts only for assigned sources
    - Admin: receives all alerts
    """
    # Get DB session
    db = next(get_db())
    
    try:
        # Authenticate user
        user = await get_user_from_token(token, db)
        if not user:
            await websocket.close(code=4001, reason="Invalid token")
            return
        
        if not user.is_active:
            await websocket.close(code=4003, reason="User inactive")
            return
        
        # Get role
        user_role = user.role.value if hasattr(user.role, 'value') else str(user.role)
        user_role = user_role.lower()
        
        # Only police and admin can connect
        if user_role not in ["admin", "police"]:
            await websocket.close(code=4003, reason="Access denied")
            return
        
        # Accept connection
        await manager.connect(websocket)
        logger.info(f"WebSocket connected: {user.email} ({user_role})")
        
        # Store user info in websocket state for filtering
        websocket.state.user_id = user.id
        websocket.state.user_role = user_role
        
        if user_role == "police":
            websocket.state.assigned_sources = AssignmentService.get_assigned_source_ids(db, user.id)
        else:
            websocket.state.assigned_sources = None  # Admin sees all
        
        # Keep connection alive
        while True:
            try:
                # Wait for messages (ping/pong or client messages)
                data = await websocket.receive_text()
                # Echo back or handle client messages if needed
                await websocket.send_text(f"Received: {data}")
            except WebSocketDisconnect:
                break
                
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)
        db.close()
