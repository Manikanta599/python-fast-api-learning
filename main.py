from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from core.database import Base, engine
from products.entity import Product
from products.router import api_router
from users.entity import User


app = FastAPI(title="Products and Users API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_database_check():
    # Create tables if they don't exist.
    Base.metadata.create_all(bind=engine)

    # Try a simple query so we know the database connection is working.
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    print("Database connected successfully")


@app.get("/")
def read_root():
    return {"message": "Products and Users API is running"}


app.include_router(api_router)
