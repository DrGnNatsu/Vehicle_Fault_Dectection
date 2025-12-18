from datetime import timedelta

from sqlalchemy.orm import Session

from app.core.config import settings
from app.exception.auth_exception import AuthFailedException, EmailDuplicateException, EmailEmptyException, \
    PasswordTooWeakException, PasswordDoNotMatchException
from app.exception.user_exception import UserNotFoundException
from app.repository.user import UserRepository
from app.schemas.login import LoginResponseDTO, LoginRequestDTO
from app.schemas.register import RegisterRequestDTO, RegisterResponseDTO, RegisterCreateUserDTO
from app.utils.auth import verify_password, create_access_token, is_password_valid, get_password_hash


class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    """
    Authenticate user and generate JWT token upon successful login.
    :param login_form: LoginRequestDTO containing user login credentials.
    :param db: Database session.    
    :return: LoginResponseDTO containing JWT token and user role.
    :raises UserNotFoundException: If the user with the provided email does not exist.
    :raises AuthFailedException: If the provided password is incorrect. 
    """

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

    """
    Create the user 
    :param register_form: RegisterRequestDTO containing user register credentials
    :param db: Database session.    
    :return: RegisterResponseDTO containing messages.
    """

    def register_user(self, register_form: RegisterRequestDTO, db: Session) -> RegisterResponseDTO:
        if register_form.email is None:
            raise EmailEmptyException

        if self.user_repo.get_user_by_email(register_form.email, db):
            raise EmailDuplicateException

        if not is_password_valid(register_form.password):
            raise PasswordTooWeakException

        if register_form.password != register_form.confirm_password:
            raise PasswordDoNotMatchException

        data: RegisterCreateUserDTO = RegisterCreateUserDTO(
            email=register_form.email,
            password=get_password_hash(register_form.password)
        )

        self.user_repo.create_user(data=data, db=db)

        return RegisterResponseDTO(message="User registered successfully")
