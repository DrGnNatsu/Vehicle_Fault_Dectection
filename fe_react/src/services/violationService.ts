import axiosInstance from "@/api/v1/axiosInstance";
import { API_ENDPOINTS } from "@/constants/api";
import type { Violation, ViolationListResponse, ViolationFilterParams } from "@/types/violation";

export const violationService = {
  fetchViolations: async (params: ViolationFilterParams): Promise<any> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VIOLATIONS.BASE, { params });
    return response.data;
  },

  fetchViolationDetail: async (id: string): Promise<Violation> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VIOLATIONS.DETAILS(id));
    return response.data;
  },

  fetchMyViolations: async (): Promise<ViolationListResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VIOLATIONS.MY);
    return response.data;
  },
};
