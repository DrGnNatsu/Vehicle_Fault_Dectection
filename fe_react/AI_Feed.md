**Act as:** Senior Frontend Developer
**Task:** Create the API Integration Layer (Service) and Types for the "Sources" module.
**Tech Stack:** TypeScript, React, [Axios or Fetch]

**Context:**
You are building the frontend for a video management dashboard. You need to consume the `/api/v1/sources` endpoints documented below. The backend handles the RBAC (Admin vs. Police), so your primary job is to correctly type the data and handle the responses/errors.

**API Specifications (to be consumed):**

1.  **List Sources**
    * **Endpoint:** `GET /api/v1/sources`
    * **Purpose:** Fetch the table of all available cameras/video files.
    * **Expected Data:** Array of `Source` objects.
    * **Notes:** If the logged-in user is "Police", this list will be pre-filtered by the backend to show only assigned sources.

2.  **Get Source Details**
    * **Endpoint:** `GET /api/v1/sources/{source_id}`
    * **Purpose:** Fetch details to play the video or edit settings.
    * **Error Handling:** If a "Police" user tries to access a source they aren't assigned to, the API will throw a `403 Forbidden`. You must handle this error gracefully in the UI.

3.  **Create Source**
    * **Endpoint:** `POST /api/v1/sources`
    * **Purpose:** Admin-only form to add a new camera or upload a video.
    * **Payload:** `{ name: string, camera_url?: string, file_path?: string, source_type: 'video' | 'camera' }`

**Data Structures (TypeScript Interfaces):**
Please define the `Source` interface based on this response shape:
```typescript
interface Source {
  id: string;
  name: string;
  camera_url: string | null; // Nullable
  file_path: string | null;  // Nullable
  is_active: boolean;
  source_type: 'video' | 'camera'; // Enum
  created_at: string;
  updated_at: string;
}

Deliverables:

TypeScript Definitions: Create a types/source.ts file with the interfaces for the Response and the CreatePayload.

API Service: Create a service file (e.g., services/sourceService.ts) using Axios (or Fetch) with functions for:

fetchSources()

fetchSourceDetail(id: string)

createSource(data: CreateSourcePayload)