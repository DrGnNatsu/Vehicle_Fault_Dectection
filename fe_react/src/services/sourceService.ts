import axiosInstance from "../api/v1/axiosInstance";
import { API_ENDPOINTS, BASE_URL } from "../constants/api";
import type { 
  Source, 
  CreateSourcePayload, 
  UpdateSourcePayload, 
  Zone, 
  ProcessingStatusResponse 
} from "../types/source";

/**
 * Sources Management Service
 * Purpose: Handle CRUD and control operations for video/camera sources.
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

  /**
   * Update Source (Admin only)
   * PUT /api/v1/sources/{source_id}
   */
  updateSource: async (sourceId: string, sourceData: UpdateSourcePayload): Promise<Source> => {
    const response = await axiosInstance.put<Source>(API_ENDPOINTS.SOURCES.DETAILS(sourceId), sourceData);
    return response.data;
  },

  /**
   * Delete Source (Admin only)
   * DELETE /api/v1/sources/{source_id}
   */
  deleteSource: async (sourceId: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.SOURCES.DETAILS(sourceId));
  },

  /**
   * Get Zones / ROI
   * GET /api/v1/sources/{source_id}/zones
   */
  fetchSourceZones: async (sourceId: string): Promise<Zone[]> => {
    const response = await axiosInstance.get<Zone[]>(`${API_ENDPOINTS.SOURCES.DETAILS(sourceId)}/zones`);
    return response.data;
  },

  /**
   * Start Processing
   * POST /api/v1/sources/{source_id}/processing/start
   */
  startProcessing: async (sourceId: string): Promise<ProcessingStatusResponse> => {
    const response = await axiosInstance.post<ProcessingStatusResponse>(`${API_ENDPOINTS.SOURCES.DETAILS(sourceId)}/processing/start`);
    return response.data;
  },

  /**
   * Stop Processing
   * POST /api/v1/sources/{source_id}/processing/stop
   */
  stopProcessing: async (sourceId: string): Promise<ProcessingStatusResponse> => {
    const response = await axiosInstance.post<ProcessingStatusResponse>(`${API_ENDPOINTS.SOURCES.DETAILS(sourceId)}/processing/stop`);
    return response.data;
  },

  /**
   * Get Stream URL (Helper)
   * Returns the absolute URL for the MJPEG stream
   */
  getStreamUrl: (sourceId: string): string => {
    return `${BASE_URL}${API_ENDPOINTS.SOURCES.DETAILS(sourceId)}/stream`;
  }
};
