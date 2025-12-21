**Act as:** Senior Frontend Developer
**Task:** Implement the "Advanced Source Operations" API service and Types.
**Tech Stack:** TypeScript, React, [Axios or Fetch]

**Context:**
You are extending the "Sources" module. We have already covered listing and creating. Now, we need to implement the detailed control features: updating, deleting, retrieving detection zones, controlling the processing engine (start/stop), and viewing the live stream.

**API Specifications (Advanced Operations):**

1.  **Update Source**
    * **Endpoint:** `PUT /api/v1/sources/{source_id}`
    * **Role:** Admin only.
    * **Purpose:** Update fields like `file_path`, `is_active`, or `source_type`.
    * **Response:** Updated `Source` object.

2.  **Delete Source**
    * **Endpoint:** `DELETE /api/v1/sources/{source_id}`
    * **Role:** Admin only.
    * **Response:** `204 No Content`.
    * **UI Behavior:** On success, redirect the user back to the list view or remove the item from the local state.

3.  **Get Zones (ROI)**
    * **Endpoint:** `GET /api/v1/sources/{source_id}/zones`
    * **Role:** Admin.
    * **Purpose:** Retrieve the Region of Interest (ROI) coordinates for drawing overlays on the video.
    * **Data Shape:** Array of objects containing `coordinates: { points: [[x,y], ...] }`.

4.  **Processing Controls**
    * **Start:** `POST /api/v1/sources/{source_id}/processing/start`
    * **Stop:** `POST /api/v1/sources/{source_id}/processing/stop`
    * **Role:** Admin OR Police.
    * **Payload:** None (empty body).
    * **Response:** `{ source_id: string, status: "running" | "stopped", message: string }`.

5.  **Live Stream**
    * **Endpoint:** `GET /api/v1/sources/{source_id}/stream`
    * **Format:** MJPEG stream (multipart).
    * **Usage:** This URL will likely be used directly in an `<img src="..." />` tag in the React component rather than an Axios fetch, but we need a helper function to construct the full URL (potentially appending an auth token if required).

**Data Structures (TypeScript Interfaces):**

```typescript
// For the Zone/ROI data
interface Zone {
  id: string;
  source_id: string;
  coordinates: {
    points: [number, number][]; // Array of [x, y] tuples
  };
  created_at: string;
  updated_at: string;
}

// For Processing Control responses
interface ProcessingStatusResponse {
  source_id: string;
  status: 'running' | 'stopped';
  message: string;
}
```
Deliverables:

Extend types/source.ts: Add the Zone and ProcessingStatusResponse interfaces.

Update services/sourceService.ts: Add functions for:

updateSource(id, data)

deleteSource(id)

fetchSourceZones(id)

startProcessing(id)

stopProcessing(id)

getStreamUrl(id): A helper that returns the full absolute URL string for the video stream.
