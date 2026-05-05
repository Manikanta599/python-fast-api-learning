from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    # Basic request validation happens here before service logic runs.
    name: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=3, max_length=255)
    price: float = Field(..., gt=0)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True
