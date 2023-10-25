from typing import List, Optional

from sqlmodel import select, Session

from app.db.models import User
from app.user import UserRead, UserCreate


class UserRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def get_all(self) -> List[UserRead]:
        statement = select(User)
        raw_users = self.session.exec(statement)
        return list(map(lambda user: user.to_read_model(), raw_users))

    def create(self, user: UserCreate) -> UserRead:
        user = User.from_create_model(user, self)
        self.session.add(user)
        self.session.commit()

        return user.to_read_model()

    def get_by_email(self, email: str) -> Optional[UserRead]:
        statement = select(User).where(User.email == email)
        user = self.session.exec(statement).first()
        if user:
            return user.to_read_model()

    def login(self, email: str, password: str) -> Optional[UserRead]:
        statement = select(User).where(User.email == email)
        user = self.session.exec(statement).first()
        if user:
            user.login(password)
            return user.to_read_model()
