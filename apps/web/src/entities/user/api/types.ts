export type UserRole = 'user' | 'admin';

export interface UserDto {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  id: string;
  email?: string;
  username?: string;
  password?: string;
  role?: UserRole;
}

export interface UserFilters {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInDto {
  login: string;
  password: string;
}

export interface AuthDto {
  user: UserDto;
  accessToken: string;
}
