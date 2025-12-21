export interface Zone {
  id: string;
  name: string;
  source_id: string;
  coordinates: { points: [number, number][] };
  created_at: string;
  updated_at: string;
}

export interface CreateZonePayload {
  name: string;
  source_id: string;
  coordinates: { points: [number, number][] };
}

export interface UpdateZonePayload {
  name: string;
  coordinates: { points: [number, number][] };
}
