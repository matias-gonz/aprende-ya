from typing import Optional
from sqlmodel import SQLModel, Field

from app.certificate import CertificateRead
from app.db.exceptions import EmailTakenException, WrongCredentialsException
from app.user import UserRead, UserCreate

from app.course import CourseRead, CourseCreate

from app.user_course_relation import UserCourseRelationRead


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

        return User(email=user.email, name=user.name, password=user.password)


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: int
    content: str
    image: str
    owner_id: int
    price: int
    exam: str

    def to_read_model(self) -> CourseRead:
        return CourseRead(id=self.id,
                          title=self.title,
                          description=self.description,
                          category=self.category,
                          content=self.content,
                          image=self.image,
                          price=self.price,
                          owner_id=self.owner_id,
                          exam=self.exam)

    @classmethod
    def from_create_model(cls, course: CourseCreate, user_id: int):
        return Course(title=course.title,
                      description=course.description,
                      category=course.category,
                      content='',
                      image=course.image,
                      price=course.price,
                      owner_id=user_id,
                      exam=course.exam)


class UserCourseRelation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    course_id: int
    is_finished: bool = False
    review: Optional[str]
    rating: Optional[int]

    @classmethod
    def from_create_model(cls, user_id: int, course_id: int):
        return UserCourseRelation(user_id=user_id, course_id=course_id)

    def to_read_model(self) -> UserCourseRelationRead:
        return UserCourseRelation(
            user_id=self.user_id,
            course_id=self.course_id,
            is_finished=self.is_finished,
            review=self.review,
            rating=self.rating)


class Certificate(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    course_id: int
    hash: str

    @classmethod
    def from_create_model(cls, user_id: int, course_id: int, hash: str):
        return Certificate(user_id=user_id, course_id=course_id, hash=hash)

    def to_read_model(self) -> CertificateRead:
        return CertificateRead(id=self.id, user_id=self.user_id, course_id=self.course_id, hash=self.hash)
