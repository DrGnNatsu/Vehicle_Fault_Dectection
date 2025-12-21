import axiosInstance from "@/api/v1/axiosInstance";
import { API_ENDPOINTS } from "@/constants/api";
import type { ViolationListResponse } from "@/types/violation";

export const violationService = {
  fetchViolations: async (params?: { skip?: number; limit?: number }): Promise<ViolationListResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VIOLATIONS.BASE, { params });
    return response.data;
  },
};
