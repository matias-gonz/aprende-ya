from pydantic import BaseModel, Field


class CourseBase(BaseModel):
    title: str = Field(description="Course title")
    description: str = Field(description="Course description")
    category: int = Field(description="Course category")


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int = Field(description="Course ID")
    owner_id: str = Field(description="Owner id")
    content: str = Field(description="Course content")
