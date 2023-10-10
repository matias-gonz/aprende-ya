from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str = Field(description="User email")


class UserCreate(UserBase):
    password: str = Field(description="User password")


class UserRead(UserBase):
    id: int = Field(description="User ID")
