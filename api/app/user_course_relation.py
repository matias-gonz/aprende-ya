from pydantic import BaseModel, Field


class UserCourseRelationBase(BaseModel):
    user_id: int = Field(description="User id")
    course_id: int = Field(description="Course id")
    is_finished: bool = Field(description="If user finished course")


class UserCourseRelationCreate(UserCourseRelationBase):
    pass


class UserCourseRelationRead(UserCourseRelationBase):
    pass
