import axiosInstance from "../api/v1/axiosInstance";
import { API_ENDPOINTS } from "../constants/api";
import type { LoginResponse, RegisterResponse } from "../types/auth";

/**
 * Auth Service
 * Purpose: Handle login and registration API requests.
 */
export const authService = {
  /**
   * Login with email and password
   * POST /api/v1/auth/login
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Register a new user account
   * POST /api/v1/auth/register
   */
  register: async (email: string, password: string, confirm_password: string): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      confirm_password,
    });
    return response.data;
  },
};
