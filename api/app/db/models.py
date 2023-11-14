from typing import Optional
from sqlmodel import SQLModel, Field

from app.db.exceptions import EmailTakenException, WrongCredentialsException
from app.user import UserRead, UserCreate

from app.course import CourseRead, CourseCreate


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    password: str
    name: str

    def login(self, password):
        if password != self.password:
            raise WrongCredentialsException()

    def to_read_model(self) -> UserRead:
        return UserRead(id=self.id, email=self.email, name=self.name, password=self.password)

    @classmethod
    def from_create_model(cls, user: UserCreate, user_repository):
        if user_repository.get_by_email(user.email):
            raise EmailTakenException()

        return User(email=user.email, name=user.name,password=user.password)


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: int
    content: str
    owner_id: int

    def to_read_model(self) -> CourseRead:
        return CourseRead(id=self.id,
                          title=self.title,
                          description=self.description,
                          category=self.category,
                          content=self.content,
                          owner_id=self.owner_id)

    @classmethod
    def from_create_model(cls, course: CourseCreate, user_id: int):
        return Course(title=course.title,
                      description=course.description,
                      category=course.category,
                      content='',
                      owner_id=user_id)
