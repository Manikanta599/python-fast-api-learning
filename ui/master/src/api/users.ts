import type {
  AuthResponse,
  CreateUserPayload,
  LoginFormValues,
} from "../types/user";

const API_BASE_URL = "http://127.0.0.1:8000";

async function parseResponse<T>(response: Response): Promise<T> {
  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    const errorDetail = Array.isArray(responseData?.detail)
      ? responseData.detail.map((item: { msg?: string }) => item.msg).join(", ")
      : responseData?.detail;

    throw new Error(errorDetail || responseData?.message || "Request failed");
  }

  return responseData as T;
}

export async function createUser(values: CreateUserPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseResponse<AuthResponse>(response);
}

export async function loginUser(values: LoginFormValues): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseResponse<AuthResponse>(response);
}
