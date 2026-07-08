export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignUpResponse = AuthResponse;

export interface SignInRequest {
  login: string;
  password: string;
}

export type SignInResponse = AuthResponse;
