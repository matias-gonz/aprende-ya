from pydantic import BaseModel, Field


class CertificateBase(BaseModel):
    user_id: int = Field(description="User ID")
    course_id: int = Field(description="Course ID")


class CertificateRead(CertificateBase):
    id: int = Field(description="Certificate ID")
    hash: str = Field(description="Certificate hash")
