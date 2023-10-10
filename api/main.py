from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from starlette import status

from app.db.database import create_db_and_tables, engine
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


@app.post("/users", status_code=status.HTTP_201_CREATED)
async def create_post(user: UserCreate) -> UserRead:
    with Session(engine) as session:
        return UserRepository(session).create(user)
