from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from starlette import status

from app.course import CourseCreate, CourseRead
from app.db.course_repository import CourseRepository
from app.db.database import create_db_and_tables, engine
from app.db.exceptions import EmailTakenException, CourseNameTakenException
from app.db.user_repository import UserRepository
from app.user import UserRead, UserCreate

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db_and_tables()


@app.get("/")
async def root():
    return "Pong!"


@app.get("/users", status_code=status.HTTP_200_OK)
async def get_users() -> List[UserRead]:
    with Session(engine) as session:
        return UserRepository(session).get_all()

@app.get("/user", status_code=status.HTTP_200_OK)
async def login(email: str, password: str) -> UserRead:
    try:
        with Session(engine) as session:
            return UserRepository(session).login(email, password)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )


@app.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate) -> UserRead:
    try:
        with Session(engine) as session:
            return UserRepository(session).create(user)
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )


@app.get("/courses", status_code=status.HTTP_200_OK)
async def get_courses() -> List[CourseRead]:
    with Session(engine) as session:
        return CourseRepository(session).get_all()


@app.post("/course", status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate) -> CourseRead:
    try:
        with Session(engine) as session:
            return CourseRepository(session).create(course)
    except CourseNameTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )
