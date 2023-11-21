from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from app.certificate import CertificateRead
from app.db.exceptions import EmailTakenException, WrongCredentialsException
from app.user import UserRead, UserCreate
from app.questions import QuestionCreate, QuestionRead
from app.course import CourseRead, CourseCreate, SectionRead, VideoRead

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


class Video(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    duration: int
    link: str
    section_id: int = Field(foreign_key="section.id")
    section: "Section" = Relationship(back_populates="videos")


class Section(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    course_id: int = Field(foreign_key="course.id")
    course: "Course" = Relationship(back_populates="sections")
    videos: List[Video] = Relationship(back_populates="section")


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: int
    image: str
    owner_id: int
    price: int
    exam: str
    sections: List[Section] = Relationship(back_populates="course")

    def to_read_model(self) -> CourseRead:
        sections = [
            SectionRead(id=section.id,
                        title=section.title,
                        videos=[VideoRead(id=video.id,
                                          title=video.title,
                                          description=video.description,
                                          duration=video.duration,
                                          link=video.link) for video in section.videos])
            for section in self.sections
        ]
        return CourseRead(id=self.id,
                          title=self.title,
                          description=self.description,
                          category=self.category,
                          image=self.image,
                          price=self.price,
                          owner_id=self.owner_id,
                          sections=sections,
                          exam=self.exam)

    @classmethod
    def from_create_model(cls, course: CourseCreate, user_id: int):
        sections = [
            Section(title=section.title,
                    videos=[Video(title=video.title,
                                    description=video.description,
                                    duration=video.duration,
                                    link=video.link) for video in section.videos])
            for section in course.sections
        ]
        return Course(title=course.title,
                      description=course.description,
                      category=course.category,
                      image=course.image,
                      price=course.price,
                      owner_id=user_id,
                      sections=sections,
                      exam=course.exam)


class UserCourseRelation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    course_id: int
    is_finished: bool = False
    purchase_date: datetime = None

    review: Optional[str] = None
    rating: Optional[int] = None

    @classmethod
    def from_create_model(cls, user_id: int, course_id: int):
        return UserCourseRelation(user_id=user_id, course_id=course_id, purchase_date=datetime.now())

    def to_read_model(self) -> UserCourseRelationRead:
        return UserCourseRelation(
            user_id=self.user_id,
            course_id=self.course_id,
            is_finished=self.is_finished,
            purchase_date=self.purchase_date,
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


class Question(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    course_id: int
    text: str
    answer: str = ""

    def to_read_model(self) -> QuestionRead:
        return QuestionRead(id=self.id, course_id=self.course_id, text=self.text, answer=self.answer)

    @classmethod
    def from_create_model(cls, question: QuestionCreate):
        return Question(course_id=question.course_id, text=question.text, answer="")

class QuestionCreate(SQLModel):
    text: str



class Wishlist(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    user_id: int
    course_id: int