from fastapi import HTTPException

from products.entity import Product
from products.repository import ProductRepository
from products.schemas import ProductCreate, ProductUpdate


class ProductService:
    def __init__(self, repo: ProductRepository):
        self.repo = repo

    def create_product(self, product_data: ProductCreate) -> Product:
        self._validate_product_data(product_data)

        new_product = Product()
        new_product.name = product_data.name.strip()
        new_product.description = product_data.description.strip()
        new_product.price = product_data.price

        return self.repo.create(new_product)

    def get_all_products(self) -> list[Product]:
        return self.repo.get_all()

    def get_product_by_id(self, product_id: int) -> Product | None:
        if product_id <= 0:
            raise HTTPException(status_code=400, detail="Product id must be greater than 0")

        return self.repo.get_by_id(product_id)

    def update_product(self, product_id: int, product_data: ProductUpdate) -> Product | None:
        if product_id <= 0:
            raise HTTPException(status_code=400, detail="Product id must be greater than 0")

        self._validate_product_data(product_data)

        product = self.repo.get_by_id(product_id)
        if product is None:
            return None

        # Naive update logic: update each field one by one.
        product.name = product_data.name.strip()
        product.description = product_data.description.strip()
        product.price = product_data.price

        return self.repo.update(product)

    def delete_product(self, product_id: int) -> bool:
        if product_id <= 0:
            raise HTTPException(status_code=400, detail="Product id must be greater than 0")

        product = self.repo.get_by_id(product_id)
        if product is None:
            return False

        self.repo.delete(product)
        return True

    def _validate_product_data(self, product_data: ProductCreate | ProductUpdate) -> None:
        # These are simple pre-validations to keep the logic easy to understand.
        if not product_data.name.strip():
            raise HTTPException(status_code=400, detail="Product name cannot be empty")

        if not product_data.description.strip():
            raise HTTPException(status_code=400, detail="Product description cannot be empty")

        if product_data.price <= 0:
            raise HTTPException(status_code=400, detail="Product price must be greater than 0")
