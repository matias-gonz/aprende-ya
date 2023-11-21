from pydantic import BaseModel, Field


class UserCourseRelationBase(BaseModel):
    user_id: int = Field(description="User id")
    course_id: int = Field(description="Course id")
    is_finished: bool = Field(description="If user finished course")
    review: str = Field(description="User review")
    rating: int = Field(description="User rating stars (from 0 to 5)")


class UserCourseRelationCreate(UserCourseRelationBase):
    pass


class UserCourseRelationRead(UserCourseRelationBase):
    pass
