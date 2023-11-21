from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class UserCourseRelationBase(BaseModel):
    user_id: int = Field(description="User id")
    course_id: int = Field(description="Course id")
    is_finished: bool = Field(description="If user finished course")
    purchase_date: Optional[datetime] = Field(description="Date of course purchase", default=None)
    review: Optional[str] = Field(description="User review", default=None)
    rating: Optional[int] = Field(description="User rating stars (from 0 to 5)", default=None)


class UserCourseRelationCreate(UserCourseRelationBase):
    pass


class UserCourseRelationRead(UserCourseRelationBase):
    pass
