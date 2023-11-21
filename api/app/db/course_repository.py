from typing import List, Optional

from sqlmodel import select, Session

from app.db.models import Course, Section, Video
from app.course import CourseRead, CourseCreate, SectionRead, SectionCreate, VideoRead, VideoCreate


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
            image=course.image,
            price=course.price,
            exam=course.exam,
            description=course.description,
            owner_id=user_id
        )

        self.session.add(new_course)
        try:
            self.session.commit()
            # After committing, new_course and its children have IDs assigned by the database

            # If sections are part of the course creation, handle them here
            if course.sections:
                for section_data in course.sections:
                    section = Section(title=section_data.title, course_id=new_course.id)
                    self.session.add(section)
                    for video_data in section_data.videos:
                        video = Video(
                            title=video_data.title,
                            description=video_data.description,
                            duration=video_data.duration,
                            link=video_data.link,
                            section_id=section.id
                        )
                        section.videos.append(video)
                    new_course.sections.append(section)

            self.session.commit()  # Commit again to save sections and videos

            return new_course.to_read_model()  # Now IDs should be available
        except Exception as e:
            self.session.rollback()
            # Handle exception
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
    
    def get_course_by_ids(self, course_ids) -> Optional[List[CourseRead]]:
        try:
            statement = select(Course).where(Course.id.in_(course_ids))
            courses = self.session.execute(statement).all()

            if courses:
                return [course.to_read_model() for course in courses]
            else:
                return None  # O return [] dependiendo de tus necesidades

        except Exception as e:
            print(f"Error retrieving courses: {e}")
            return None  # O lanza una excepción según tus necesidades
