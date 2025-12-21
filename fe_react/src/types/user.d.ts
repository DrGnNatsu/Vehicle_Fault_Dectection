import type { UserRole } from "./auth";

export interface User {
  id: string;
  email: string;
  role: string | UserRole;
  full_name?: string | null;
  license_plate?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: string;
  full_name?: string | null;
  license_plate?: string | null;
}

export interface UpdateUserRequest {
  full_name?: string | null;
  role?: string;
  is_active?: boolean | null;
  license_plate?: string | null;
}
