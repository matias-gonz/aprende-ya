from typing import Optional, List

from pydantic import BaseModel, Field


class Video(BaseModel):
    title: str = Field(description="Video title")
    description: str = Field(description="Video description")
    duration: int = Field(description="Duration in seconds")
    link: str = Field(description="Video link")


class Section(BaseModel):
    title: str = Field(description="Section title")
    videos: List[Video] = Field(default=[], description="List of videos in the section")


class CourseBase(BaseModel):
    title: str = Field(description="Course title")
    description: str = Field(description="Course description")
    category: int = Field(description="Course category")
    image: str = Field(description="Course image")
    price: int = Field(description="Course price")
    exam: str = Field(description="Exam details as JSON")
    sections: Optional[List[Section]] = Field(default=None, description="Course sections")


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int = Field(description="Course ID")
    owner_id: str = Field(description="Owner id")
    content: str = Field(description="Course content")
