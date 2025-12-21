export type UserRole = 'User' | 'Police' | 'Admin';

export interface LoginResponse {
  jwt_token: string;
  token_type: string;
  role: UserRole;
}

export interface RegisterResponse {
  message: string;
}

export interface AuthState {
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}
