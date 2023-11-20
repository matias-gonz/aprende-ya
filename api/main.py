import datetime
from typing import List, Annotated

import web3
from fastapi import FastAPI, HTTPException, Cookie
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from starlette import status
from web3 import Web3

from app.questions import QuestionCreate, QuestionRead,QuestionEdit
from app.db.certificate_repository import CertificateRepository
from app.db.questions_repository import QuestionRepository
from app.db.user_course_relation_repository import UserCourseRelationRepository
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


@app.put("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def edit_user(user_id: str, user_data: UserCreate) -> UserRead:
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


@app.get("/course/{course_id}", status_code=status.HTTP_200_OK)
async def get_course(course_id: str) -> CourseRead:
    try:
        with Session(engine) as session:
            return CourseRepository(session).get_course_by_id(course_id)
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )


@app.get("/course/{course_id}/user/{user_id}", status_code=status.HTTP_200_OK)
async def get_course_information_by_user_id(course_id: int, user_id: int):
    try:
        with Session(engine) as session:
            return UserCourseRelationRepository(session).get_course_relation_by_user_id(course_id, user_id)
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )

@app.get("/courses/{user_id}", status_code=status.HTTP_200_OK)
async def get_courses_by_user_id(user_id: int):
    try:
        with Session(engine) as session:
            return UserCourseRelationRepository(session).get_courses_by_user_id(user_id)
    except EmailTakenException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )


@app.post("/course-purchases/{course_id}/users/{user_id}")
def buy_course(course_id: int, user_id: int):
    try:
        with Session(engine) as session:
            UserCourseRelationRepository(session).create(user_id, course_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message,
        )

    return {"message": "Course purchased successfully!"}


@app.get("/certificates/{user_id}")
def get_certificates(user_id: int):
    with Session(engine) as session:
        return CertificateRepository(session).get_certificates_by_user_id(user_id)


@app.post("/certificates/{user_id}")
def create_certificate(user_id: int, course_id: int, email: str):
    with Session(engine) as session:
        contract_address = '0x106205B74530Ea2BB08AdBD72B329014FC2f93ae'
        abi = [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {'inputs': [{'internalType': 'string', 'name': '_course', 'type': 'string'}, {'internalType': 'string', 'name': '_userName', 'type': 'string'}, {'internalType': 'string', 'name': '_date', 'type': 'string'}, {'internalType': 'string', 'name': '_userId', 'type': 'string'}], 'name': 'addCertificate', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'certificateCount', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'certificates', 'outputs': [{'internalType': 'string', 'name': 'course', 'type': 'string'}, {'internalType': 'string', 'name': 'userName', 'type': 'string'}, {'internalType': 'string', 'name': 'date', 'type': 'string'}, {'internalType': 'string', 'name': 'userId', 'type': 'string'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_id', 'type': 'uint256'}], 'name': 'getCertificate', 'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}, {'internalType': 'string', 'name': '', 'type': 'string'}, {'internalType': 'string', 'name': '', 'type': 'string'}, {'internalType': 'string', 'name': '', 'type': 'string'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'owner', 'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}]
        w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/6503d426dbff47df8ff6259418f1404a'))

        contract = w3.eth.contract(address=contract_address, abi=abi)
        tx = contract.functions.addCertificate(str(course_id), email, str(datetime.datetime.today()), str(user_id)).build_transaction(
            {
                "gasPrice": w3.eth.gas_price,
                "chainId": 11155111,
                "from": '0x50cE4EcA5ec60418e8BCC71040cA10E7FD93B9ec',
                "nonce": w3.eth.get_transaction_count('0x50cE4EcA5ec60418e8BCC71040cA10E7FD93B9ec'),
            }
        )

        signed_tx = w3.eth.account.sign_transaction(tx, '0x9a724b6085f4d5f1c96a93d1f805bd5e333c3b94570c46d7f8db80fdfaa03865')
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print(f'Transaction hash: {tx_hash.hex()}')
        return CertificateRepository(session).create(user_id, course_id, str(tx_hash.hex()))


@app.post("/questions/", response_model=QuestionRead)
def create_question(question: QuestionCreate):
    with Session(engine) as session:
        return QuestionRepository(session).create(question)

@app.get("/questions/{course_id}", response_model=List[QuestionRead])
def get_questions_for_course(course_id: int):
    with Session(engine) as session:

        return QuestionRepository(session).get_all_for_course(course_id)

# Endpoint to get a specific question by ID
@app.get("/question/{question_id}", response_model=QuestionRead)
def get_question(question_id: int):
    with Session(engine) as session:
        question = QuestionRepository(session).get_by_id(question_id)
        if question is None:
            raise HTTPException(status_code=404, detail="Question not found")
        return question

# Endpoint to add or update an answer to a question
@app.post("/questions/{question_id}/answer", response_model=QuestionRead)
def add_or_update_answer(question_id: int, answer: QuestionEdit):
    with Session(engine) as session:
        question = QuestionRepository(session).add_or_update_answer(question_id, answer.answer)
        if question is None:
            raise HTTPException(status_code=404, detail="Question not found")
        return question
