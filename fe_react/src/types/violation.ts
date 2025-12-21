export interface Violation {
  id: string;
  source_id: string;
  rule_id: string;
  timestamp: string;
  detected_license_plate: string | null;
  evidence_url: string; // URL to image/video
  metadata: Record<string, any>;
}

export interface ViolationListResponse {
  violations: Violation[];
  total: number;
  skip: number;
  limit: number;
}
