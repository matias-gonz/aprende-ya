from typing import List, Optional

from sqlmodel import select, Session

from app.db.models import UserCourseRelation

from app.db.models import Course, Section

class CourseWithRelation:
    def __init__(self, id: int, title: str, description: str, category: int, sections: List[Section], image: str, price: int,
                 owner_id: int, exam: str, is_finished: Optional[bool] = None):
        self.id = id
        self.title = title
        self.description = description
        self.category = category
        self.sections = sections
        self.image = image
        self.price = price
        self.owner_id = owner_id
        self.exam = exam
        self.is_finished = is_finished


class UserCourseRelationRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def create(self, user_id: int, course_id: int):
        user_course_relation = UserCourseRelation.from_create_model(user_id, course_id)
        self.session.add(user_course_relation)
        self.session.commit()

    def get_course_relation_by_user_id(self, course_id, user_id):
        statement = select(Course).where(Course.id == course_id)
        course = self.session.exec(statement).first()
        if course:
            course_data = course.to_read_model()

            statement = select(UserCourseRelation).where(UserCourseRelation.user_id == user_id)
            user_course_relation = self.session.exec(statement).first()

            is_finished = None
            if user_course_relation:
                is_finished = user_course_relation.is_finished

            # Convertir course_data a un diccionario
            course_data_dict = dict(course_data)

            return CourseWithRelation(**course_data_dict, is_finished=is_finished)

    def get_courses_by_user_id(self, user_id):
        statement = select(UserCourseRelation).where(UserCourseRelation.user_id == user_id)
        raw_user_course_relation = self.session.exec(statement)

        return [user_course_relation.to_read_model() for user_course_relation in raw_user_course_relation]
    
    def get_reviews_by_course_id(self, course_id):
        statement = select(UserCourseRelation).where(UserCourseRelation.course_id == course_id)
        raw_user_course_relation = self.session.exec(statement)

        return [user_course_relation.to_read_model() for user_course_relation in raw_user_course_relation]

    def update_user_course_relation(self, course_id, user_id, user_course_relation_data):
        statement = select(UserCourseRelation).where(
            UserCourseRelation.user_id == user_id and UserCourseRelation.course_id == course_id)
        user_course_relation = self.session.exec(statement).first()
        if user_course_relation:
            for field, value in user_course_relation_data.items():
                if value is not None:
                    setattr(user_course_relation, field, value)
            self.session.commit()
            return user_course_relation.to_read_model()
        return None
