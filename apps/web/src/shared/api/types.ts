export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}
