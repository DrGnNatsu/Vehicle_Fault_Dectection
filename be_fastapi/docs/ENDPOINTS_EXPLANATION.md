# How the Endpoints Work - Detailed Explanation

## Table of Contents
1. [Authentication Flow](#authentication-flow)
2. [Architecture Overview](#architecture-overview)
3. [Assignment Endpoints](#assignment-endpoints)
4. [Sources Endpoints](#sources-endpoints)
5. [Filtering Logic](#filtering-logic)
6. [Complete Flow Examples](#complete-flow-examples)

---

## Authentication Flow

### Step-by-Step Authentication Process

Every endpoint requires authentication via the `X-User-Id` header:

```
Request → get_current_user() → require_admin()/require_police() → Endpoint Handler
```

#### 1. `get_current_user()` Dependency
```python
# Location: app/api/dependencies.py

def get_current_user(x_user_id: Header, db: Session) -> User:
```

**What it does:**
1. ✅ Extracts `X-User-Id` header from request
2. ✅ Validates UUID format
3. ✅ Queries database for user
4. ✅ Checks if user exists
5. ✅ Checks if user is active
6. ✅ Returns User object

**If any step fails:**
- Missing header → `401 Unauthorized`
- Invalid UUID → `400 Bad Request`
- User not found → `404 Not Found`
- User inactive → `403 Forbidden`

#### 2. Role-Based Authorization

**`require_admin()`** - Only allows admin users
```python
if current_user.role.lower() != "admin":
    raise HTTPException(403, "Admin access required")
```

**`require_police()`** - Only allows police users
```python
if current_user.role.lower() != "police":
    raise HTTPException(403, "Police access required")
```

---

## Architecture Overview

```
┌─────────────┐
│   Client    │
│  (Frontend) │
└──────┬──────┘
       │ HTTP Request
       │ + X-User-Id header
       ▼
┌─────────────────────────────────────┐
│         FastAPI Router              │
│  (app/api/assignments.py)           │
│  (app/api/sources.py)                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│    Dependency Injection              │
│  - get_current_user()               │
│  - require_admin() / require_police()│
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│      Service Layer                  │
│  (app/service/assignment_service.py) │
│  - Business Logic                   │
│  - Data Validation                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│      Database Layer                 │
│  - SQLAlchemy ORM                   │
│  - Models (User, Source, Assignment)│
└─────────────────────────────────────┘
```

---

## Assignment Endpoints

### 1. POST `/api/assignments` - Assign Sources to Police

**Purpose:** Admin assigns sources to a police user

**Authorization:** Admin only (`require_admin`)

**Request Flow:**
```
1. Request arrives with X-User-Id header
   ↓
2. get_current_user() validates admin user
   ↓
3. require_admin() checks role = "admin"
   ↓
4. Endpoint receives AssignmentRequest:
   {
     "police_id": "uuid",
     "source_ids": ["uuid1", "uuid2", ...]
   }
   ↓
5. AssignmentService.assign_sources_to_police() executes:
   a. Validates police user exists and has "police" role
   b. Validates all source_ids exist
   c. DELETE old assignments for this police
   d. INSERT new assignments
   e. COMMIT transaction
   ↓
6. Returns AssignmentResponse with success message
```

**Example Request:**
```bash
POST /api/assignments
Headers:
  X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73  # Admin ID
Content-Type: application/json

Body:
{
  "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
  "source_ids": [
    "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
    "019b2c8d-120d-7976-92f9-93ed8642a5d6"
  ]
}
```

**Example Response:**
```json
{
  "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
  "assigned_source_ids": [
    "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
    "019b2c8d-120d-7976-92f9-93ed8642a5d6"
  ],
  "message": "Successfully assigned 2 source(s) to police user"
}
```

**Database Operations:**
```sql
-- Step 1: Delete old assignments
DELETE FROM police_source_assignments 
WHERE user_id = 'police-uuid';

-- Step 2: Insert new assignments
INSERT INTO police_source_assignments (user_id, source_id) VALUES
  ('police-uuid', 'source-uuid-1'),
  ('police-uuid', 'source-uuid-2');
```

**Error Cases:**
- Police user not found → `400 Bad Request`
- User is not a police user → `400 Bad Request`
- Source IDs don't exist → `400 Bad Request`
- Non-admin user → `403 Forbidden`

---

### 2. GET `/api/assignments/police/{police_id}` - Get Police Assignments

**Purpose:** Admin views assignments for a specific police user

**Authorization:** Admin only

**Request Flow:**
```
1. Admin request with X-User-Id header
   ↓
2. require_admin() validates
   ↓
3. Extract police_id from URL path
   ↓
4. AssignmentService.get_police_assignments() executes:
   - JOIN police_source_assignments with sources
   - FILTER by police_id
   - RETURN list of SourceAssignmentInfo
```

**Example:**
```bash
GET /api/assignments/police/019b2c8d-11a0-7985-bdac-27db1f4b69f1
Headers:
  X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73  # Admin
```

**Response:**
```json
[
  {
    "source_id": "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
    "source_name": "Main Street Camera 1",
    "source_type": "camera",
    "is_active": true
  },
  {
    "source_id": "019b2c8d-120d-7976-92f9-93ed8642a5d6",
    "source_name": "Highway Camera 2",
    "source_type": "camera",
    "is_active": true
  }
]
```

---

### 3. GET `/api/assignments/my-sources` - Get My Assignments

**Purpose:** Police user views their own assigned sources

**Authorization:** Police only (`require_police`)

**Key Difference:** Uses `current_user.id` instead of path parameter

**Request Flow:**
```
1. Police request with X-User-Id header
   ↓
2. require_police() validates role = "police"
   ↓
3. Uses current_user.id (from authentication)
   ↓
4. Returns assignments for that police user
```

**Example:**
```bash
GET /api/assignments/my-sources
Headers:
  X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1  # Police ID
```

---

### 4. GET `/api/assignments/all` - Get All Assignments

**Purpose:** Admin views all assignments grouped by police

**Authorization:** Admin only

**Request Flow:**
```
1. Admin request
   ↓
2. AssignmentService.get_all_assignments() executes:
   a. Query all users with role = "police"
   b. For each police user:
      - Get their assignments
      - Group into dictionary
   c. Return grouped result
```

**Response Structure:**
```json
{
  "police-uuid-1": {
    "police_id": "uuid-1",
    "police_name": "Police Officer 1",
    "police_email": "police1@example.com",
    "assigned_sources": [...]
  },
  "police-uuid-2": {
    "police_id": "uuid-2",
    "police_name": "Police Officer 2",
    "police_email": "police2@example.com",
    "assigned_sources": [...]
  }
}
```

---

## Sources Endpoints

### 1. GET `/api/sources` - Get Sources (WITH FILTERING)

**Purpose:** Get sources, filtered by user role

**Authorization:** Any authenticated user

**Filtering Logic:**

#### For Admin Users:
```python
if current_user.role.lower() == "admin":
    sources = db.query(Source).filter(Source.is_active == True).all()
    # Returns ALL active sources
```

#### For Police Users:
```python
elif current_user.role.lower() == "police":
    # Step 1: Get assigned source IDs
    assigned_source_ids = AssignmentService.get_assigned_source_ids(
        db, current_user.id
    )
    
    # Step 2: Filter sources by assignment
    sources = db.query(Source).filter(
        Source.id.in_(assigned_source_ids),
        Source.is_active == True
    ).all()
    # Returns ONLY assigned sources
```

**Visual Flow:**
```
Police Request → Get assigned_source_ids → Filter Sources → Return Filtered List
     ↓                    ↓                      ↓
  [1,2,3]          Query assignments      WHERE id IN (1,2,3)
                            ↓                    ↓
                    Return [1,2,3]      Return 3 sources
```

**Example - Admin Request:**
```bash
GET /api/sources
Headers:
  X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73  # Admin
```

**Response (Admin sees ALL 7 active sources):**
```json
[
  {"id": "...", "name": "Main Street Camera 1", ...},
  {"id": "...", "name": "Highway Camera 2", ...},
  {"id": "...", "name": "Intersection Camera 3", ...},
  {"id": "...", "name": "Parking Lot Camera 4", ...},
  {"id": "...", "name": "Traffic Video File 1", ...},
  {"id": "...", "name": "Traffic Video File 2", ...},
  {"id": "...", "name": "Downtown Camera 5", ...}
]
```

**Example - Police Request:**
```bash
GET /api/sources
Headers:
  X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1  # Police 1
```

**Response (Police sees ONLY 3 assigned sources):**
```json
[
  {"id": "...", "name": "Main Street Camera 1", ...},
  {"id": "...", "name": "Highway Camera 2", ...},
  {"id": "...", "name": "Intersection Camera 3", ...}
]
```

**Database Query for Police:**
```sql
-- Step 1: Get assigned source IDs
SELECT source_id FROM police_source_assignments 
WHERE user_id = 'police-uuid';

-- Step 2: Get sources
SELECT * FROM sources 
WHERE id IN (assigned_ids) 
  AND is_active = TRUE;
```

---

### 2. GET `/api/sources/{source_id}` - Get Source by ID

**Purpose:** Get a specific source with access control

**Authorization:** Any authenticated user

**Access Control:**

#### Admin:
- ✅ Can access ANY source (even inactive)

#### Police:
- ✅ Can access ONLY assigned sources
- ❌ Returns `403 Forbidden` if source not assigned

**Request Flow:**
```
1. Request with source_id in URL
   ↓
2. Query source from database
   ↓
3. If source not found → 404
   ↓
4. If police user:
   a. Get assigned_source_ids
   b. Check if source_id in assigned list
   c. If not → 403 Forbidden
   ↓
5. Return source details
```

**Example - Police accessing assigned source:**
```bash
GET /api/sources/019b2c8d-1200-7fd6-824c-5ba730cf5f17
Headers:
  X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1  # Police 1
```

**Response:** ✅ Returns source details

**Example - Police accessing unassigned source:**
```bash
GET /api/sources/019b2c8d-1211-7688-a110-31c03801452e  # Not assigned
Headers:
  X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1  # Police 1
```

**Response:** ❌ `403 Forbidden - You don't have access to this source`

---

## Filtering Logic

### How Filtering Works

The filtering happens automatically based on:
1. **User Role** (admin vs police)
2. **Assignment Table** (`police_source_assignments`)

### Filtering Flow Diagram

```
┌─────────────────────────────────────────┐
│         GET /api/sources                 │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Check Role   │
        └──────┬───────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
  ┌─────────┐    ┌──────────────┐
  │ Admin   │    │   Police     │
  └────┬────┘    └──────┬───────┘
       │                │
       │                ▼
       │        ┌──────────────────┐
       │        │ Get assigned IDs│
       │        │ from assignments │
       │        └────────┬─────────┘
       │                 │
       │                 ▼
       │        ┌──────────────────┐
       │        │ Filter sources   │
       │        │ WHERE id IN (...)│
       │        └────────┬─────────┘
       │                 │
       └────────────────┴─────────┐
                    │              │
                    ▼              ▼
            ┌───────────────┐
            │ Return Sources│
            └───────────────┘
```

### Key Points

1. **Admin**: No filtering - sees everything
2. **Police**: Automatic filtering via `AssignmentService.get_assigned_source_ids()`
3. **Filtering happens at database level** - efficient SQL queries
4. **Inactive sources** are excluded for both roles

---

## Complete Flow Examples

### Example 1: Admin Assigns Sources to Police

```
┌──────────┐
│ Frontend│
└────┬─────┘
     │ POST /api/assignments
     │ Headers: X-User-Id: admin-id
     │ Body: {police_id, source_ids}
     ▼
┌─────────────────────┐
│ FastAPI Router      │
│ /api/assignments     │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ get_current_user()  │
│ - Validates header  │
│ - Gets admin user   │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ require_admin()     │
│ - Checks role       │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Endpoint Handler    │
│ assign_sources_...  │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ AssignmentService   │
│ .assign_sources...  │
│ 1. Validate police  │
│ 2. Validate sources │
│ 3. DELETE old       │
│ 4. INSERT new       │
│ 5. COMMIT          │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Database            │
│ police_source_       │
│ assignments table   │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Response            │
│ {police_id,         │
│  assigned_ids,      │
│  message}           │
└─────────────────────┘
```

### Example 2: Police Views Dashboard (Filtered Sources)

```
┌──────────┐
│ Frontend │
│ (Police)│
└────┬─────┘
     │ GET /api/sources
     │ Headers: X-User-Id: police-id
     ▼
┌─────────────────────┐
│ FastAPI Router      │
│ /api/sources        │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ get_current_user()  │
│ - Gets police user  │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Endpoint Handler    │
│ get_sources()       │
│ - Checks role       │
└────┬────────────────┘
     │
     ▼ (role = "police")
┌─────────────────────┐
│ AssignmentService   │
│ .get_assigned_      │
│ source_ids()        │
│ - Query assignments │
│ - Return [id1,id2]  │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Filter Sources      │
│ WHERE id IN (ids)   │
│ AND is_active=True  │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Response            │
│ [source1, source2]  │
│ (Only assigned)     │
└─────────────────────┘
```

---

## Summary

### Key Concepts

1. **Authentication**: Every request needs `X-User-Id` header
2. **Authorization**: Role-based (admin vs police)
3. **Filtering**: Automatic for police users based on assignments
4. **Assignment**: Atomic operation (delete old + insert new)
5. **Service Layer**: Business logic separated from API layer

### Endpoint Summary Table

| Endpoint | Method | Role | Purpose | Filtering |
|----------|--------|------|---------|-----------|
| `/api/assignments` | POST | Admin | Assign sources | N/A |
| `/api/assignments/police/{id}` | GET | Admin | View police assignments | N/A |
| `/api/assignments/my-sources` | GET | Police | View my assignments | N/A |
| `/api/assignments/all` | GET | Admin | View all assignments | N/A |
| `/api/sources` | GET | All | Get sources | ✅ Yes (for police) |
| `/api/sources/{id}` | GET | All | Get source by ID | ✅ Yes (for police) |

### Testing Tips

1. Use `docker compose exec app python script/get_user_ids.py` to get user IDs
2. Test with Swagger UI at `http://localhost:8000/docs`
3. Admin can see everything, police only sees assigned sources
4. Assignments are replaced (not appended) when admin assigns
