from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.depend import get_auth_service
from app.database.session import get_db
from app.schemas.login import LoginRequestDTO, LoginResponseDTO
from app.schemas.register import RegisterRequestDTO, RegisterResponseDTO
from app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponseDTO)
async def login(
        form_data: LoginRequestDTO,
        db: AsyncSession = Depends(get_db),
        auth_service: AuthService = Depends(get_auth_service)
):
    return await auth_service.authenticate_user(login_form=form_data, db=db)


@router.post("/register", response_model=RegisterResponseDTO)
async def register(
        form_data: RegisterRequestDTO,
        db: AsyncSession = Depends(get_db),
        auth_service: AuthService = Depends(get_auth_service)
):
    return await auth_service.register_user(register_form=form_data, db=db)
