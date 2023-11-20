# repositories.py
from typing import List, Optional

from sqlmodel import Session

from app.db.models import Question
from app.questions import QuestionCreate, QuestionRead

class QuestionRepository:

    def __init__(self, session: Session):
        self.session: Session = session

    def create(self, question: QuestionCreate) -> QuestionRead:
        new_question = Question.from_create_model(question)
        self.session.add(new_question)
        self.session.commit()
        self.session.refresh(new_question)
        return new_question

    def get_all_for_course(self, course_id: int) -> List[QuestionRead]:
        return self.session.query(Question).filter(Question.course_id == course_id).all()

    def get_by_id(self, question_id: int) -> Optional[QuestionRead]:
        return self.session.query(Question).filter(Question.id == question_id).first()

    def add_or_update_answer(self, question_id: int, answer: str) -> Optional[QuestionRead]:
        question = self.session.query(Question).filter(Question.id == question_id).first()
        if question:
            question.answer = answer
            self.session.commit()
            self.session.refresh(question)
            return question
        return None
