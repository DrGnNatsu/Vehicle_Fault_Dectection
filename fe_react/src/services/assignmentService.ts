import axiosInstance from "@/api/v1/axiosInstance";
import { API_ENDPOINTS } from "@/constants/api";
import type { 
  AssignSourcesPayload, 
  AssignmentResponse, 
  AllAssignmentsResponse, 
  AssignmentSource 
} from "@/types/assignments";

export const assignmentService = {
  assignSources: async (payload: AssignSourcesPayload): Promise<AssignmentResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.ASSIGNMENTS.BASE, payload);
    return response.data;
  },

  getPoliceAssignments: async (policeId: string): Promise<AssignmentSource[]> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ASSIGNMENTS.POLICE(policeId));
    return response.data;
  },

  getMyAssignments: async (): Promise<AssignmentSource[]> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ASSIGNMENTS.MY);
    return response.data;
  },

  getAllAssignments: async (): Promise<AllAssignmentsResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ASSIGNMENTS.ALL);
    return response.data;
  },
};
