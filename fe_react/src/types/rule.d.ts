export interface Rule {
  id: string;
  name: string;
  dsl_content: string;
  is_active: boolean;
  created_by_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRulePayload {
  name: string;
  dsl_content: string;
}

export interface UpdateRulePayload {
  name?: string;
  dsl_content?: string;
  is_active?: boolean;
}
