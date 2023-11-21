from typing import Optional, List

from pydantic import BaseModel, Field


class VideoCreate(BaseModel):
    title: str
    description: str
    duration: int
    link: str

class VideoRead(VideoCreate):
    id: int

class SectionCreate(BaseModel):
    title: str
    videos: List[VideoCreate]

class SectionRead(BaseModel):
    title: str
    videos: List[VideoRead]

class CourseBase(BaseModel):
    title: str
    description: str
    category: int
    image: str
    price: int
    exam: str

class CourseCreate(CourseBase):
    sections: List[SectionCreate]

class CourseRead(CourseBase):
    id: int
    owner_id: str
    sections: List[SectionRead]

