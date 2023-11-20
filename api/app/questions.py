# schemas.py
from typing import List

from pydantic import BaseModel

class QuestionBase(BaseModel):
    text: str
    course_id: int

class QuestionCreate(QuestionBase):
    pass

class QuestionEdit(BaseModel):
    answer:str

class QuestionRead(QuestionBase):
    id: int
    answer: str

class QuestionList(QuestionRead):
    pass
