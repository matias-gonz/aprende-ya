from uuid import uuid4

import bcrypt
from typing import Optional
from sqlmodel import SQLModel, Field

from app.db.exceptions import EmailTakenException, CourseNameTakenException
from app.user import UserRead, UserCreate

from api.app.course import CourseRead, CourseCreate


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    password_hash: str

    def to_read_model(self) -> UserRead:
        return UserRead(id=self.id, email=self.email)

    @classmethod
    def from_create_model(cls, user: UserCreate, user_repository):
        if user_repository.get_by_email(user.email):
            raise EmailTakenException()

        password_hash = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
        return User(email=user.email, password_hash=password_hash)


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: str
    content: str

    def to_read_model(self) -> CourseRead:
        return CourseRead(id=self.id, title=self.title, description=self.description, category=self.category, content=self.content)

    @classmethod
    def from_create_model(cls, course: CourseCreate, course_repository):
        if course_repository.get_by_name(course.name):
            raise CourseNameTakenException()

        return Course(id=uuid4(), title=course.title , description=course.description, category=course.category, content=course.content)
