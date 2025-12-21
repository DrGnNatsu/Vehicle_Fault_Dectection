import axiosInstance from "@/api/v1/axiosInstance";
import { API_ENDPOINTS } from "@/constants/api";
import type { Zone, CreateZonePayload, UpdateZonePayload } from "@/types/zone";

export const zoneService = {
  getZones: async (sourceId?: string): Promise<Zone[]> => {
    const params = sourceId ? { source_id: sourceId } : {};
    const response = await axiosInstance.get(API_ENDPOINTS.ZONES.BASE, { params });
    // Handle array or wrapped response if needed, assuming array based on spec
    return response.data;
  },

  getZoneById: async (zoneId: string): Promise<Zone> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ZONES.DETAILS(zoneId));
    return response.data;
  },

  createZone: async (payload: CreateZonePayload): Promise<Zone> => {
    const response = await axiosInstance.post(API_ENDPOINTS.ZONES.BASE, payload);
    return response.data;
  },

  updateZone: async (zoneId: string, payload: UpdateZonePayload): Promise<Zone> => {
    const response = await axiosInstance.put(API_ENDPOINTS.ZONES.DETAILS(zoneId), payload);
    return response.data;
  },

  deleteZone: async (zoneId: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.ZONES.DETAILS(zoneId));
  },
};
