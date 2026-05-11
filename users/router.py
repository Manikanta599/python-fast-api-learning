from fastapi import APIRouter

from users.controller import router as users_controller_router


api_router = APIRouter()

# All user routes will start with /users.
api_router.include_router(
    users_controller_router,
    prefix="/users",
    tags=["Users"],
)
