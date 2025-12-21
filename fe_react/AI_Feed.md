**Act as:** Senior Frontend Developer
**Task:** Create the API Integration Layer (Types and Service Functions) for the "Assignments" module based on the provided API documentation image.
**Tech Stack:** TypeScript, React, Axios.

**Context:**
You are implementing the frontend functionality to manage assignments between "Police" users and "Sources" (cameras/videos). The backend provides 4 endpoints for this module. Note the different roles required for different endpoints (Admin vs. Police).

---

### **Assignments Module Specification**
**Base URL:** `/api/v1/assignments`

#### **Data Types**
Based on the request and response examples in the documentation image, you must define the following TypeScript interfaces.

*Note on Source Object:* Several endpoints return a list of source objects. Based on the image, a source object has this structure: `[{ "id": "...", "name": "...", "camera_url": "...", "file_path": "...", "source_type": "...", "is_active": true }]`. Please define a `Source` interface for this.

1.  **`AssignSourcesPayload` (POST Request Body):**
    * `police_id`: string (uuid)
    * `source_ids`: string[] (array of uuids)

2.  **`AssignmentResponse` (POST Response Body):**
    * `police_id`: string
    * `assigned_source_ids`: string[]

3.  **`AllAssignmentsResponse` (GET /all Response Body):**
    * This is a grouped object where keys are police IDs and values are arrays of source objects.
    * Type: `Record<string, Source[]>`

#### **API Service Functions**
Implement a service module (e.g., `assignmentService.ts`) using an Axios instance with functions for each endpoint below:

1.  **Assign Sources to Police**
    * **Endpoint:** `POST /api/v1/assignments`
    * **Role:** Admin
    * **Description:** Replaces the list of sources assigned to a specific police user.
    * **Request Body:** `AssignSourcesPayload`
    * **Function Signature:** `assignSources(payload: AssignSourcesPayload): Promise<AssignmentResponse>`

2.  **Get Specific Police Assignments**
    * **Endpoint:** `GET /api/v1/assignments/police/{police_id}`
    * **Role:** Admin
    * **Description:** Get the list of source objects assigned to a specific police ID path parameter.
    * **Function Signature:** `getPoliceAssignments(policeId: string): Promise<Source[]>`

3.  **Get "My" Assignments**
    * **Endpoint:** `GET /api/v1/assignments/my-sources`
    * **Role:** Police
    * **Description:** Used by a logged-in police user to fetch their own assigned sources.
    * **Function Signature:** `getMyAssignments(): Promise<Source[]>`

4.  **Get All Assignments (Grouped)**
    * **Endpoint:** `GET /api/v1/assignments/all`
    * **Role:** Admin
    * **Description:** Get all assignments, grouped by police ID.
    * **Function Signature:** `getAllAssignments(): Promise<AllAssignmentsResponse>`

---

### **Deliverables:**
1.  **`src/types/assignments.ts`**: A file containing the interface definitions for `Source` (contextual based on response), `AssignSourcesPayload`, `AssignmentResponse`, and `AllAssignmentsResponse`.
2.  **`src/services/assignmentService.ts`**: A service file containing the 4 asynchronous functions listed above, implemented with Axios. Ensure standard error handling is included.