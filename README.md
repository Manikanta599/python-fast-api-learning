# Python FastAPI Learning

This is a simple full stack products and users project built for learning.

The backend is created with `FastAPI` and `SQLAlchemy`.
The frontend is created with `React`, `TypeScript`, and `Ant Design`.

## Project Purpose

This project is made to practice:
- FastAPI basics
- CRUD APIs
- database connection
- SQLAlchemy models and sessions
- React UI for APIs
- simple full stack integration

## What This Project Does

This app manages products and users.

You can:
- create a product
- view all products
- get product by id
- update a product
- delete a product
- create a user
- view all users
- get user by id
- update a user
- delete a user

## Backend

The backend includes:
- FastAPI application
- product routes
- user routes
- controller, service, repository structure
- MySQL database connection
- request validation using Pydantic

Main backend folders/files:
- `main.py`
- `core/`
- `products/`
- `users/`

## Frontend

The frontend includes:
- React UI
- TypeScript
- Ant Design components
- product form
- product table
- API integration with FastAPI

Frontend location:
- `ui/master`

## APIs

Available product APIs:
- `POST /products/`
- `GET /products/`
- `GET /products/{product_id}`
- `PUT /products/{product_id}`
- `DELETE /products/{product_id}`

Available user APIs:
- `POST /users/`
- `GET /users/`
- `GET /users/{user_id}`
- `PUT /users/{user_id}`
- `DELETE /users/{user_id}`

## How To Run

### Run backend

```bash
./myenv/bin/uvicorn main:app --reload
```

### Run frontend

```bash
cd ui/master
npm start
```

## Notes

- backend runs on `http://127.0.0.1:8000`
- frontend runs on `http://localhost:3000`
- API docs are available at `http://127.0.0.1:8000/docs`

## Summary

This is a beginner-friendly product management project using FastAPI for backend and React for frontend. It is useful for learning APIs, database connection, and full stack development in a simple way.
