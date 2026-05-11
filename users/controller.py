from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import get_db
from users.repository import UserRepository
from users.schemas import AuthResponse, UserCreate, UserLogin, UserResponse, UserUpdate
from users.service import UserService


router = APIRouter()


@router.post("/", response_model=AuthResponse, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    created_user = service.create_user(user)
    return {
        "message": "User account created successfully",
        "user": created_user,
    }


@router.post("/login", response_model=AuthResponse)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    user = service.authenticate_user(credentials.username, credentials.password)

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {
        "message": "Login successful",
        "user": user,
    }


@router.get("/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    return service.get_all_users()


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    user = service.get_user_by_id(user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    updated_user = service.update_user(user_id, user_data)

    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    deleted = service.delete_user(user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}
