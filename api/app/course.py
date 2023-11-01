from pydantic import BaseModel, Field


class CourseBase(BaseModel):
    title: str = Field(description="Course title")
    description: str = Field(description="Course description")
    category: str = Field(description="Course category")
    content: str = Field(description="Course content")


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int = Field(description="Course ID")
    owner_id: str = Field(description="Owner id")
