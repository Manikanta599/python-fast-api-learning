from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import get_db
from products.repository import ProductRepository
from products.schemas import ProductCreate, ProductResponse, ProductUpdate
from products.service import ProductService


router = APIRouter()


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.create_product(product)


@router.get("/", response_model=list[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.get_all_products()


@router.get("/{product_id}", response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    product = service.get_product_by_id(product_id)

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    updated_product = service.update_product(product_id, product_data)

    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    deleted = service.delete_product(product_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}
