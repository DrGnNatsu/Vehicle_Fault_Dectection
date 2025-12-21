import axiosInstance from "../api/v1/axiosInstance";
import { API_ENDPOINTS } from "../constants/api";
import type { Source, CreateSourcePayload } from "../types/source";

/**
 * Sources Management Service
 * Purpose: Handle CRUD operations for video/camera sources.
 */
export const sourceService = {
  /**
   * List Sources
   * GET /api/v1/sources
   */
  fetchSources: async (): Promise<Source[]> => {
    const response = await axiosInstance.get<Source[]>(API_ENDPOINTS.SOURCES.BASE);
    return response.data;
  },

  /**
   * Get Source Details
   * GET /api/v1/sources/{source_id}
   */
  fetchSourceDetail: async (sourceId: string): Promise<Source> => {
    const response = await axiosInstance.get<Source>(API_ENDPOINTS.SOURCES.DETAILS(sourceId));
    return response.data;
  },

  /**
   * Create Source (Admin only)
   * POST /api/v1/sources
   */
  createSource: async (sourceData: CreateSourcePayload): Promise<Source> => {
    const response = await axiosInstance.post<Source>(API_ENDPOINTS.SOURCES.BASE, sourceData);
    return response.data;
  },
};
