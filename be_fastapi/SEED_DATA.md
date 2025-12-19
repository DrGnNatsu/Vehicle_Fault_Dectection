# Seed Data Documentation

## Overview
The database has been seeded with initial test data including users, sources, and assignments.

## Users Created

### Admin User
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: admin
- **Name**: Admin User

### Police Users
1. **Police Officer 1**
   - Email: police1@example.com
   - Password: police123
   - License Plate: POL001

2. **Police Officer 2**
   - Email: police2@example.com
   - Password: police123
   - License Plate: POL002

3. **Police Officer 3**
   - Email: police3@example.com
   - Password: police123
   - License Plate: POL003

## Sources Created

### Camera Sources (Active)
1. Main Street Camera 1
   - URL: rtsp://camera1.example.com:554/stream

2. Highway Camera 2
   - URL: rtsp://camera2.example.com:554/stream

3. Intersection Camera 3
   - URL: rtsp://camera3.example.com:554/stream

4. Parking Lot Camera 4
   - URL: rtsp://camera4.example.com:554/stream

5. Downtown Camera 5
   - URL: rtsp://camera5.example.com:554/stream

### Camera Sources (Inactive)
6. School Zone Camera 6
   - URL: rtsp://camera6.example.com:554/stream
   - Status: Inactive (for testing)

### File Sources
7. Traffic Video File 1
   - Path: /static/videos/traffic_video_1.mp4
   - Duration: 3600 seconds (1 hour)

8. Traffic Video File 2
   - Path: /static/videos/traffic_video_2.mp4
   - Duration: 7200 seconds (2 hours)

## Assignments

### Police Officer 1
Assigned Sources:
- Main Street Camera 1
- Highway Camera 2
- Intersection Camera 3

### Police Officer 2
Assigned Sources:
- Intersection Camera 3 (overlaps with Police 1)
- Parking Lot Camera 4
- Traffic Video File 1

### Police Officer 3
Assigned Sources:
- Traffic Video File 1 (overlaps with Police 2)
- Traffic Video File 2
- Downtown Camera 5

## Getting User IDs

To get the current user IDs for API testing, run:

```bash
docker compose exec app python script/get_user_ids.py
```

This will display:
- All user emails and their corresponding UUIDs
- Example API curl commands with the correct user IDs

## Testing the API

### 1. Get User IDs
```bash
docker compose exec app python script/get_user_ids.py
```

### 2. Test Admin - Get All Sources
```bash
ADMIN_ID="<admin-uuid-from-above>"
curl -H "X-User-Id: $ADMIN_ID" http://localhost:8000/api/sources
```

### 3. Test Police - Get Assigned Sources (Filtered)
```bash
POLICE_ID="<police-uuid-from-above>"
curl -H "X-User-Id: $POLICE_ID" http://localhost:8000/api/sources
```

### 4. Test Police - Get My Assignments
```bash
POLICE_ID="<police-uuid-from-above>"
curl -H "X-User-Id: $POLICE_ID" http://localhost:8000/api/assignments/my-sources
```

### 5. Test Admin - Assign Sources to Police
```bash
ADMIN_ID="<admin-uuid>"
POLICE_ID="<police-uuid>"
SOURCE_ID1="<source-uuid-1>"
SOURCE_ID2="<source-uuid-2>"

curl -X POST \
  -H "X-User-Id: $ADMIN_ID" \
  -H "Content-Type: application/json" \
  -d "{\"police_id\": \"$POLICE_ID\", \"source_ids\": [\"$SOURCE_ID1\", \"$SOURCE_ID2\"]}" \
  http://localhost:8000/api/assignments
```

### 6. Test Admin - Get All Assignments
```bash
ADMIN_ID="<admin-uuid>"
curl -H "X-User-Id: $ADMIN_ID" http://localhost:8000/api/assignments/all
```

## Re-seeding Data

To re-seed the database (will skip existing records):

```bash
docker compose exec app python script/seed_data.py
```

The script is idempotent - it will:
- Skip users that already exist (by email)
- Skip sources that already exist (by name)
- Delete and recreate assignments for existing police users

## Notes

- All passwords are hashed using bcrypt
- User IDs are UUIDs (UUIDv7 format)
- Sources can be shared between multiple police officers
- Inactive sources are excluded from police views but visible to admin
- The seed script can be run multiple times safely
