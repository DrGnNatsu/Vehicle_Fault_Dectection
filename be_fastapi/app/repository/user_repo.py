from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.enum.role import Role
from app.models.user import User
from app.schemas.register import RegisterCreateUserDTO


class UserRepository:
    def __init__(self):
        pass

    async def get_user_by_email(self, email: EmailStr, db: AsyncSession) -> User | None:
        query = select(User).where(User.email == str(email))
        result = await db.execute(query)
        return result.scalars().first()

    async def create_user(self, data: RegisterCreateUserDTO, db: AsyncSession) -> None:
        new_user = User(
            email=str(data.email),
            hashed_password=data.password,
            role=Role.USER
        )

        db.add(new_user)

        await db.flush()
        await db.refresh(new_user)
