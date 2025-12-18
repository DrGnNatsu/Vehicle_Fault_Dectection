from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.login import LoginRequestDTO, LoginResponseDTO
from app.service.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
auth_service = AuthService()


@router.post("/login", response_model=LoginResponseDTO)
def login(form_data: LoginRequestDTO, db: Session = Depends(get_db)):
    return auth_service.authenticate_user(login_form=form_data, db=db)
