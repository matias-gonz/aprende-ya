from typing import List, Annotated

from fastapi import FastAPI, HTTPException, Cookie
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from starlette import status

from app.course import CourseCreate, CourseRead, CourseUpdate
from app.db.course_repository import CourseRepository
from app.db.database import create_db_and_tables, engine
from app.db.exceptions import EmailTakenException, CourseNameTakenException, CourseNotFoundException
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
@app.put("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def edit_user(user_id:str, user_data: UserCreate) -> UserRead:
    try:
        with Session(engine) as session:
            return UserRepository(session).update_user(user_id, user_data.dict(exclude_unset=True))
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )

@app.get("/user/{user_id}", status_code=status.HTTP_200_OK)
async def get_user(user_id: str) -> UserRead:
    try:
        with Session(engine) as session:
            return UserRepository(session).get_user_by_id(user_id)
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )
@app.delete("/user/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user(user_id: str) -> dict:
    try:
        with Session(engine) as session:
            return {"deleted": UserRepository(session).delete_user(user_id)}
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
async def create_course(course: CourseCreate, user_id: Annotated[str | None, Cookie()] = None) -> CourseRead:
    try:
        with Session(engine) as session:
            return CourseRepository(session).create(course, int(user_id))
    except CourseNameTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )

@app.put("/course", status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate, user_id: Annotated[str | None, Cookie()] = None) -> CourseRead:
    try:
        with Session(engine) as session:
            return CourseRepository(session).create(course, int(user_id))
    except CourseNameTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )
    
@app.put("/course/{course_id}", status_code=status.HTTP_200_OK)
async def update_course(course_id: int, course_update: CourseUpdate, user_id: Annotated[str | None, Cookie()] = None) -> CourseRead:
    try:
        with Session(engine) as session:
            course_repository = CourseRepository(session)
            course = course_repository.update(course_id, course_update)

    except CourseNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message,
        )