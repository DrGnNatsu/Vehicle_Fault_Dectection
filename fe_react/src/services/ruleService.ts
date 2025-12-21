import axiosInstance from "@/api/v1/axiosInstance";
import { API_ENDPOINTS } from "@/constants/api";
import type { Rule, CreateRulePayload, UpdateRulePayload } from "@/types/rule";

export const ruleService = {
  fetchRules: async (): Promise<Rule[]> => {
    const response = await axiosInstance.get(API_ENDPOINTS.RULES.BASE);
    return response.data;
  },

  fetchRuleDetail: async (id: string): Promise<Rule> => {
    const response = await axiosInstance.get(API_ENDPOINTS.RULES.DETAILS(id));
    return response.data;
  },

  createRule: async (data: CreateRulePayload): Promise<Rule> => {
    const response = await axiosInstance.post(API_ENDPOINTS.RULES.BASE, data);
    return response.data;
  },

  updateRule: async (id: string, data: UpdateRulePayload): Promise<Rule> => {
    const response = await axiosInstance.put(API_ENDPOINTS.RULES.DETAILS(id), data);
    return response.data;
  },

  deleteRule: async (id: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.RULES.DETAILS(id));
  },
};
