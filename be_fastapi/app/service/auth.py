from datetime import timedelta

from sqlalchemy.orm import Session

from app.core.config import settings
from app.exception.auth_exception import AuthFailedException
from app.exception.user_exception import UserNotFoundException
from app.repository.user import UserRepository
from app.schemas.login import LoginResponseDTO, LoginRequestDTO
from app.utils.auth import verify_password, create_access_token


class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def authenticate_user(self, login_form: LoginRequestDTO, db: Session) -> LoginResponseDTO:
        user = self.user_repo.get_user_by_email(login_form.email, db)

        # Check if user exists
        if not user:
            raise UserNotFoundException

        # Verify password
        if not verify_password(login_form.password, user.hashed_password):
            raise AuthFailedException

        data: dict = {
            "sub": str(user.id),
            "role": user.role.value
        }
        expires_delta: timedelta = timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOUR)

        access_token = create_access_token(data=data, expires_delta=expires_delta)

        return LoginResponseDTO(
            jwt_token=access_token,
            role=user.role
        )
