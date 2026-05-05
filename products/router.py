from fastapi import APIRouter

from products.controller import router as products_controller_router


api_router = APIRouter()

# All product routes will start with /products.
api_router.include_router(
    products_controller_router,
    prefix="/products",
    tags=["Products"],
)
