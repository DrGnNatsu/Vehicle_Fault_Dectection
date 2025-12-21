export interface Source {
  id: string;
  name: string;
  camera_url: string | null;
  file_path: string | null;
  is_active: boolean;
  source_type: 'video' | 'camera';
  created_at: string;
  updated_at: string;
}

export interface CreateSourcePayload {
  name: string;
  camera_url?: string;
  file_path?: string;
  source_type: 'video' | 'camera';
}
