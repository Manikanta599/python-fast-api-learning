from fastapi import HTTPException

from users.entity import User
from users.repository import UserRepository
from users.schemas import UserCreate, UserUpdate


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def create_user(self, user_data: UserCreate) -> User:
        self._validate_user_data(user_data)
        self._ensure_unique_user(user_data.email, user_data.username)

        new_user = User()
        new_user.full_name = user_data.full_name.strip()
        new_user.email = user_data.email.strip().lower()
        new_user.username = user_data.username.strip()
        new_user.password = user_data.password.strip()

        return self.repo.create(new_user)

    def get_all_users(self) -> list[User]:
        return self.repo.get_all()

    def authenticate_user(self, username: str, password: str) -> User | None:
        normalized_username = username.strip()
        normalized_password = password.strip()

        if not normalized_username:
            raise HTTPException(status_code=400, detail="Username cannot be empty")

        if not normalized_password:
            raise HTTPException(status_code=400, detail="Password cannot be empty")

        user = self.repo.get_by_username(normalized_username)
        if user is None or user.password != normalized_password:
            return None

        return user

    def get_user_by_id(self, user_id: int) -> User | None:
        if user_id <= 0:
            raise HTTPException(status_code=400, detail="User id must be greater than 0")

        return self.repo.get_by_id(user_id)

    def update_user(self, user_id: int, user_data: UserUpdate) -> User | None:
        if user_id <= 0:
            raise HTTPException(status_code=400, detail="User id must be greater than 0")

        self._validate_user_data(user_data)

        user = self.repo.get_by_id(user_id)
        if user is None:
            return None

        normalized_email = user_data.email.strip().lower()
        normalized_username = user_data.username.strip()

        existing_email_user = self.repo.get_by_email(normalized_email)
        if existing_email_user and existing_email_user.id != user_id:
            raise HTTPException(status_code=400, detail="Email is already registered")

        existing_username_user = self.repo.get_by_username(normalized_username)
        if existing_username_user and existing_username_user.id != user_id:
            raise HTTPException(status_code=400, detail="Username is already taken")

        user.full_name = user_data.full_name.strip()
        user.email = normalized_email
        user.username = normalized_username
        user.password = user_data.password.strip()

        return self.repo.update(user)

    def delete_user(self, user_id: int) -> bool:
        if user_id <= 0:
            raise HTTPException(status_code=400, detail="User id must be greater than 0")

        user = self.repo.get_by_id(user_id)
        if user is None:
            return False

        self.repo.delete(user)
        return True

    def _validate_user_data(self, user_data: UserCreate | UserUpdate) -> None:
        if not user_data.full_name.strip():
            raise HTTPException(status_code=400, detail="Full name cannot be empty")

        if not user_data.email.strip():
            raise HTTPException(status_code=400, detail="Email cannot be empty")

        if "@" not in user_data.email or "." not in user_data.email:
            raise HTTPException(status_code=400, detail="Email must be valid")

        if not user_data.username.strip():
            raise HTTPException(status_code=400, detail="Username cannot be empty")

        if not user_data.password.strip():
            raise HTTPException(status_code=400, detail="Password cannot be empty")

    def _ensure_unique_user(self, email: str, username: str) -> None:
        normalized_email = email.strip().lower()
        normalized_username = username.strip()

        if self.repo.get_by_email(normalized_email):
            raise HTTPException(status_code=400, detail="Email is already registered")

        if self.repo.get_by_username(normalized_username):
            raise HTTPException(status_code=400, detail="Username is already taken")
