from pydantic import BaseModel, Field, field_validator


class UserBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=120)
    username: str = Field(..., min_length=3, max_length=50)


class UserCreate(UserBase):
    password: str = Field(..., max_length=255)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value.strip()) < 6:
            raise ValueError("Password must be at least 6 characters long")
        return value


class UserUpdate(UserBase):
    password: str = Field(..., max_length=255)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value.strip()) < 6:
            raise ValueError("Password must be at least 6 characters long")
        return value


class UserLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=1, max_length=255)


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    message: str
    user: UserResponse
