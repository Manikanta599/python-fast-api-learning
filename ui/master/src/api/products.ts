import type { Product, ProductFormValues } from "../types/product";


const API_BASE_URL = "http://127.0.0.1:8000";


async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Request failed");
  }

  return response.json() as Promise<T>;
}


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`);
  return parseResponse<Product[]>(response);
}


export async function createProduct(values: ProductFormValues): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseResponse<Product>(response);
}


export async function updateProduct(
  productId: number,
  values: ProductFormValues
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseResponse<Product>(response);
}


export async function deleteProduct(productId: number): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
  });

  return parseResponse<{ message: string }>(response);
}
