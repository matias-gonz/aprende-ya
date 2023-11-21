from typing import List, Optional

from sqlmodel import select, Session

from app.db.models import Course
from app.course import CourseRead, CourseCreate, Section, Video


class CourseRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def get_all(self) -> List[CourseRead]:
        statement = select(Course)
        raw_courses = self.session.exec(statement)
        return [course.to_read_model() for course in raw_courses]

    def create(self, course: CourseCreate, user_id: int) -> CourseRead:
        new_course = Course(
            title=course.title,
            category=course.category,
            content=course.content,
            image=course.image,
            price=course.price,
            exam=course.exam,
            description=course.description,
            owner_id=user_id,
            sections=[
                Section(
                    title=section.title,
                    videos=[
                        Video(
                            title=video.title,
                            description=video.description,
                            duration=video.duration,
                            link=video.link
                        ) for video in section.videos
                    ]
                ) for section in course.sections
            ] if course.sections else None
        )
        self.session.add(new_course)
        try:
            self.session.commit()
            return new_course.to_read_model()
        except Exception as e:
            self.session.rollback()
            # Handle exception (e.g., log it, convert to HTTPException, etc.)
            raise e

    def get_by_title(self, title: str) -> Optional[CourseRead]:
        statement = select(Course).where(Course.title == title)
        course = self.session.exec(statement).first()
        if course:
            return course.to_read_model()

    def get_course_by_id(self, course_id) -> Optional[CourseRead]:
        statement = select(Course).where(Course.id == course_id)
        course = self.session.exec(statement).first()
        if course:
            return course.to_read_model()
