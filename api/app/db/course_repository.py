from typing import List, Optional

from sqlmodel import select, Session

from app.db.models import Course
from app.course import CourseRead, CourseCreate


class CourseRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def get_all(self) -> List[CourseRead]:
        statement = select(Course)
        raw_courses = self.session.exec(statement)
        return [course.to_read_model() for course in raw_courses]

    def create(self, course: CourseCreate) -> CourseRead:
        course = Course.from_create_model(course, self)
        self.session.add(course)
        self.session.commit()

        return course.to_read_model()

    def get_by_name(self, name: str) -> Optional[CourseRead]:
        statement = select(Course).where(Course.name == name)
        course = self.session.exec(statement).first()
        if course:
            return course.to_read_model()
