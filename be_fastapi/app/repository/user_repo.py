from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.enum.role import Role
from app.exception.user_exception import UserCreateFailException
from app.models.user import User
from app.schemas.register import RegisterCreateUserDTO


class UserRepository:
    def __init__(self):
        pass

    def get_user_by_email(self, email: EmailStr, db: Session) -> User | None:
        return db.query(User).filter(User.email == str(email)).first()

    def create_user(self, data: RegisterCreateUserDTO, db) -> None:
        new_user = User(
            email=str(data.email),
            hashed_password=data.password,
            role=Role.USER
        )

        try:
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

        except Exception:
            db.rollback()
            raise UserCreateFailException()
