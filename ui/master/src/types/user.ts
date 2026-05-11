export type User = {
  id: number;
  full_name: string;
  email: string;
  username: string;
};

export type AuthResponse = {
  message: string;
  user: User;
};

export type SignUpFormValues = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type CreateUserPayload = {
  full_name: string;
  email: string;
  username: string;
  password: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};
