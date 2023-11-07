from typing import List, Optional

from sqlmodel import select, Session
from app.db.exceptions import CourseNotFoundException

from app.db.models import Course
from app.course import CourseRead, CourseCreate, CourseUpdate


class CourseRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def get_all(self) -> List[CourseRead]:
        statement = select(Course)
        raw_courses = self.session.exec(statement)
        return [course.to_read_model() for course in raw_courses]

    def create(self, course: CourseCreate, user_id: int) -> CourseRead:
        course = Course.from_create_model(course, user_id)
        self.session.add(course)
        self.session.commit()

        return course.to_read_model()

    def get_by_title(self, title: str) -> Optional[CourseRead]:
        statement = select(Course).where(Course.title == title)
        course = self.session.exec(statement).first()
        if course:
            return course.to_read_model()

    
    def get(self, course_id: int) -> Optional[Course]:
        statement = select(Course).where(Course.id == course_id)
        return self.session.exec(statement).first()
    
    def update(self, course_id: int, course_update: CourseUpdate) -> CourseRead:
        course = self.get(course_id)
        if course is None:
            raise CourseNotFoundException("Course not found")

        course.title = course_update.title
        course.description = course_update.description
        course.category = course_update.category
        course.content = course_update.content

        self.session.commit()

        return course.to_read_model()