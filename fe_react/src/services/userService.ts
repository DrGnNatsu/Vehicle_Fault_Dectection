import axiosInstance from "../api/v1/axiosInstance";
import { API_ENDPOINTS } from "../constants/api";
import type { User, CreateUserRequest, UpdateUserRequest } from "../types/user";

/**
 * User Management Service (Admin only)
 * Purpose: Handle CRUD operations for users.
 */
export const userService = {
  /**
   * List Users
   * GET /api/v1/users
   */
  listUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(API_ENDPOINTS.USERS.BASE);
    return response.data;
  },

  /**
   * Get User Details
   * GET /api/v1/users/{user_id}
   */
  getUserDetails: async (userId: string): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.USERS.DETAILS(userId));
    return response.data;
  },

  /**
   * Create User
   * POST /api/v1/users
   */
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await axiosInstance.post<User>(API_ENDPOINTS.USERS.BASE, userData);
    return response.data;
  },

  /**
   * Update User
   * PUT /api/v1/users/{user_id}
   */
  updateUser: async (userId: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await axiosInstance.put<User>(API_ENDPOINTS.USERS.DETAILS(userId), userData);
    return response.data;
  },

  /**
   * Delete User (Soft Delete)
   * DELETE /api/v1/users/{user_id}
   */
  deleteUser: async (userId: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.USERS.DETAILS(userId));
  },
};
