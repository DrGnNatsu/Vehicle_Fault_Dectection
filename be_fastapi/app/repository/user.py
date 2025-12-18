from app.models.user import User
from sqlalchemy.orm import Session


class UserRepository:
    def __init__(self):
        pass

    def get_user_by_email(self, email, db: Session) -> User | None:
        return db.query(User).filter(User.email == email).first()
