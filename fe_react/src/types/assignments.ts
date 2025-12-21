export interface AssignmentSource {
  id: string;
  name: string;
  camera_url: string;
  file_path: string;
  source_type: string;
  is_active: boolean;
}

export interface AssignSourcesPayload {
  police_id: string;
  source_ids: string[];
}

export interface AssignmentResponse {
  police_id: string;
  assigned_source_ids: string[];
}

export type AllAssignmentsResponse = Record<string, AssignmentSource[]>;
