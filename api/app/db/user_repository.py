from typing import List

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
        user = User.from_create_model(user)
        self.session.add(user)
        self.session.commit()

        return user.to_read_model()
