**Act as:** Senior Backend Developer
**Task:** Implement a User Management API module based on the specifications below.
**Tech Stack:** [Insert your preferred stack, e.g., Python FastAPI with SQLAlchemy OR Node.js Express with TypeORM]

**Context:**
You are building a RESTful API with the base URL `/api/v1`. These endpoints are for **Admin use only**. You must enforce role-based access control (RBAC) to ensure only users with the `Admin` role can access these routes.

**Data Model (User):**
* Fields: `id` (UUID), `email`, `password` (hashed), `role` (enum: 'admin', 'police', 'user'), `full_name`, `license_plate`, `is_active` (boolean), `created_at` (datetime), `updated_at` (datetime).

**Endpoints Specification:**

1.  **List Users**
    * **Method:** `GET`
    * **Path:** `/users`
    * **Role Required:** Admin
    * **Description:** Retrieve a list of all users.
    * **Response:** A JSON array of user objects (excluding sensitive password data).

2.  **Get User Details**
    * **Method:** `GET`
    * **Path:** `/users/{user_id}`
    * **Role Required:** Admin
    * **Description:** Retrieve details for a specific user by ID.
    * **Response:** A detailed User object including `license_plate`, `is_active`, and timestamps.

3.  **Create User**
    * **Method:** `POST`
    * **Path:** `/users`
    * **Role Required:** Admin
    * **Description:** Create a new user (specifically for creating 'police' or standard 'user' roles).
    * **Request Body:**
        ```json
        {
          "email": "string",
          "password": "string",
          "role": "police", // or "user"
          "full_name": "string",
          "license_plate": "string"
        }
        ```
    * **Logic:** Hash the password before saving.
    * **Response:** The created User object.

4.  **Update User**
    * **Method:** `PUT`
    * **Path:** `/users/{user_id}`
    * **Role Required:** Admin
    * **Description:** Update user information.
    * **Request Body:** Allow updates for `full_name`, `role`, `license_plate`, and `is_active`.
    * **Response:** The updated User object.

5.  **Delete User (Soft Delete)**
    * **Method:** `DELETE`
    * **Path:** `/users/{user_id}`
    * **Role Required:** Admin
    * **Description:** Perform a soft delete.
    * **Logic:** Do **not** remove the row from the database. Instead, find the user and set `is_active = False`.
    * **Response:** HTTP status `204 No Content`.

**Deliverables:**
Please write the code for:
1.  The Data Schemas/DTOs (Request and Response models).
2.  The API Route/Controller handlers implementation.
3.  Assume a database session dependency is available.