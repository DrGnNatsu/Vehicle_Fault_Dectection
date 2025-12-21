**Act as:** Senior Frontend Developer
**Task:** Create the API Integration Layer (Types and Service Functions) for the "Violations" module based on the provided API documentation image.
**Tech Stack:** TypeScript, React, Axios.

**Context:**
You are building the frontend service to fetch violation data. The backend exposes three `GET` endpoints for retrieving violation records, supporting various filtering and role-based access (Admin, Police, Customer).

**IMPORTANT NOTE ON DATA TYPES:**
The provided documentation image describes the request parameters but **does not** show the JSON structure of the *response* (the Violation object itself).
**Action required:** Please define a reasonable *placeholder* TypeScript interface for a `Violation` based on common sense and the query parameters available (e.g., it likely contains an `id`, `license_plate`, `source_id`, `rule_id`, `timestamp`, etc.).

---

### **Violations Module Specification**
**Base URL:** `/api/v1/violations`

#### **1. Fetch Violation List (with Filters)**
* **Endpoint:** `GET /`
* **Roles:** Admin / Police / Customer
* **Description:** Fetches a paginated and filtered list of violations.
* **Request (Query Parameters):**
    You need to define an interface for these parameters:
    * `source_id` (string, optional)
    * `rule_id` (string, optional)
    * `date_from` (string/date, optional)
    * `date_to` (string/date, optional)
    * `license_plate` (string, optional)
    * `skip` (number/integer, used for pagination)
    * `limit` (number/integer, used for pagination)

#### **2. Fetch Single Violation Details**
* **Endpoint:** `GET /{violation_id}`
* **Roles:** Admin / Police / Customer
* **Description:** Fetches details of a specific violation by its ID path parameter.

#### **3. Fetch "My" Violations**
* **Endpoint:** `GET /my`
* **Role:** Customer Only
* **Description:** Fetches the list of violations associated specifically with the currently logged-in customer account.

---

### **Deliverables:**
1.  **`src/types/violations.ts`**:
    * Define the placeholder `Violation` interface (response).
    * Define the `ViolationFilterParams` interface (request query params).
2.  **`src/services/violationService.ts`**:
    * Create a service object/module using an Axios instance.
    * Implement asynchronous functions for all three endpoints:
        * `getViolations(params: ViolationFilterParams)`
        * `getViolationById(violationId: string)`
        * `getMyViolations()`
3.  **Error Handling**: Ensure the service functions catch errors and re-throw them in a standardized way for UI consumption.