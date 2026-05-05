from fastapi import FastAPI
from sqlalchemy import text

from core.database import Base, engine
from products.entity import Product
from products.router import api_router


app = FastAPI(title="Products API")


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
    return {"message": "Products API is running"}


app.include_router(api_router)
