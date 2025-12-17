# UC04 - Assign Source to Police (Admin) - API Documentation

## Overview
This implementation provides endpoints for assigning sources to police users and filtering sources based on assignments.

## Authentication
All endpoints require authentication via the `X-User-Id` header:
```
X-User-Id: <user_uuid>
```

## Endpoints

### 1. Assign Sources to Police (Admin Only)
**POST** `/api/assignments`

Assigns sources to a police user. Deletes old assignments and inserts new ones.

**Headers:**
- `X-User-Id`: Admin user UUID (required)

**Request Body:**
```json
{
  "police_id": "uuid-of-police-user",
  "source_ids": ["uuid-of-source-1", "uuid-of-source-2"]
}
```

**Response:**
```json
{
  "police_id": "uuid-of-police-user",
  "assigned_source_ids": ["uuid-of-source-1", "uuid-of-source-2"],
  "message": "Successfully assigned 2 source(s) to police user"
}
```

**Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid request (police not found, sources not found, etc.)
- `401 Unauthorized`: Missing or invalid user ID
- `403 Forbidden`: User is not an admin
- `500 Internal Server Error`: Server error

---

### 2. Get Police Assignments (Admin Only)
**GET** `/api/assignments/police/{police_id}`

Get all sources assigned to a specific police user.

**Headers:**
- `X-User-Id`: Admin user UUID (required)

**Path Parameters:**
- `police_id`: UUID of the police user

**Response:**
```json
[
  {
    "source_id": "uuid-of-source",
    "source_name": "Camera 1",
    "source_type": "camera",
    "is_active": true
  }
]
```

---

### 3. Get My Assigned Sources (Police Only)
**GET** `/api/assignments/my-sources`

Get all sources assigned to the current police user. Used for dashboard filtering.

**Headers:**
- `X-User-Id`: Police user UUID (required)

**Response:**
```json
[
  {
    "source_id": "uuid-of-source",
    "source_name": "Camera 1",
    "source_type": "camera",
    "is_active": true
  }
]
```

---

### 4. Get All Assignments (Admin Only)
**GET** `/api/assignments/all`

Get all assignments grouped by police user.

**Headers:**
- `X-User-Id`: Admin user UUID (required)

**Response:**
```json
{
  "police-uuid-1": {
    "police_id": "police-uuid-1",
    "police_name": "John Doe",
    "police_email": "john@example.com",
    "assigned_sources": [
      {
        "source_id": "source-uuid-1",
        "source_name": "Camera 1",
        "source_type": "camera",
        "is_active": true
      }
    ]
  }
}
```

---

### 5. Get Sources (Filtered by Assignment)
**GET** `/api/sources`

Get sources. Admin sees all active sources, Police sees only assigned sources.

**Headers:**
- `X-User-Id`: User UUID (required)

**Response:**
```json
[
  {
    "id": "uuid-of-source",
    "name": "Camera 1",
    "camera_url": "rtsp://...",
    "file_path": null,
    "is_active": true,
    "source_type": "camera",
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
]
```

**Behavior:**
- **Admin**: Returns all active sources
- **Police**: Returns only sources assigned to the police user (filtered by assignment)
- **Other roles**: Returns empty list

---

### 6. Get Source by ID (Filtered by Assignment)
**GET** `/api/sources/{source_id}`

Get a specific source by ID.

**Headers:**
- `X-User-Id`: User UUID (required)

**Path Parameters:**
- `source_id`: UUID of the source

**Response:**
```json
{
  "id": "uuid-of-source",
  "name": "Camera 1",
  "camera_url": "rtsp://...",
  "file_path": null,
  "is_active": true,
  "source_type": "camera",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

**Behavior:**
- **Admin**: Can access any source
- **Police**: Can only access sources assigned to them (returns 403 if not assigned)

---

## Implementation Details

### Database Schema
- Table: `police_source_assignments`
  - `user_id` (UUID, FK to users.id)
  - `source_id` (UUID, FK to sources.id)
  - Composite primary key: (user_id, source_id)

### Service Layer
- `AssignmentService.assign_sources_to_police()`: Deletes old assignments and inserts new ones
- `AssignmentService.get_police_assignments()`: Gets assigned sources for a police user
- `AssignmentService.get_assigned_source_ids()`: Gets list of source IDs for filtering
- `AssignmentService.get_all_assignments()`: Gets all assignments grouped by police

### Security
- Admin endpoints require `role = "admin"`
- Police endpoints require `role = "police"`
- Sources are automatically filtered for police users based on assignments

---

## Example Usage Flow

1. **Admin assigns sources to police:**
   ```bash
   POST /api/assignments
   Headers: X-User-Id: <admin-uuid>
   Body: {
     "police_id": "<police-uuid>",
     "source_ids": ["<source-uuid-1>", "<source-uuid-2>"]
   }
   ```

2. **Police views dashboard (sources filtered automatically):**
   ```bash
   GET /api/sources
   Headers: X-User-Id: <police-uuid>
   # Returns only assigned sources
   ```

3. **Police views their assignments:**
   ```bash
   GET /api/assignments/my-sources
   Headers: X-User-Id: <police-uuid>
   ```
