from typing import Optional
from pydantic import BaseModel

class WishlistCreate(BaseModel):
    user_id: int
    course_id: int

class WishlistRead(WishlistCreate):
    id: int

    class Config:
        orm_mode = True
