# Example API Requests

## POST /api/assignments - Complete Request Example

### Using cURL

```bash
curl -X POST http://localhost:8000/api/assignments \
  -H "X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73" \
  -H "Content-Type: application/json" \
  -d '{
    "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
    "source_ids": [
      "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
      "019b2c8d-120d-7976-92f9-93ed8642a5d6",
      "019b2c8d-1211-7688-a110-31c03801452e"
    ]
  }'
```

### Request Structure

```
POST /api/assignments
Headers:
  X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73  ← Admin user ID
  Content-Type: application/json

Body:
{
  "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
  "source_ids": [
    "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
    "019b2c8d-120d-7976-92f9-93ed8642a5d6",
    "019b2c8d-1211-7688-a110-31c03801452e"
  ]
}
```

### Using JavaScript/Fetch

```javascript
fetch('http://localhost:8000/api/assignments', {
  method: 'POST',
  headers: {
    'X-User-Id': '019b2c8d-115e-751d-9825-4704955e7f73',  // Admin ID
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    police_id: '019b2c8d-11a0-7985-bdac-27db1f4b69f1',
    source_ids: [
      '019b2c8d-1200-7fd6-824c-5ba730cf5f17',
      '019b2c8d-120d-7976-92f9-93ed8642a5d6',
      '019b2c8d-1211-7688-a110-31c03801452e'
    ]
  })
})
```

### Using Python/Requests

```python
import requests

url = "http://localhost:8000/api/assignments"
headers = {
    "X-User-Id": "019b2c8d-115e-751d-9825-4704955e7f73",  # Admin ID
    "Content-Type": "application/json"
}
data = {
    "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
    "source_ids": [
        "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
        "019b2c8d-120d-7976-92f9-93ed8642a5d6",
        "019b2c8d-1211-7688-a110-31c03801452e"
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### Using Postman

1. **Method**: POST
2. **URL**: `http://localhost:8000/api/assignments`
3. **Headers**:
   - `X-User-Id`: `019b2c8d-115e-751d-9825-4704955e7f73`
   - `Content-Type`: `application/json`
4. **Body** (raw JSON):
```json
{
  "police_id": "019b2c8d-11a0-7985-bdac-27db1f4b69f1",
  "source_ids": [
    "019b2c8d-1200-7fd6-824c-5ba730cf5f17",
    "019b2c8d-120d-7976-92f9-93ed8642a5d6",
    "019b2c8d-1211-7688-a110-31c03801452e"
  ]
}
```

---

## GET /api/sources - Complete Request Example

### Admin Request (sees all sources)

```bash
curl -H "X-User-Id: 019b2c8d-115e-751d-9825-4704955e7f73" \
  http://localhost:8000/api/sources
```

### Police Request (sees only assigned sources)

```bash
curl -H "X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1" \
  http://localhost:8000/api/sources
```

---

## GET /api/assignments/my-sources - Police Request

```bash
curl -H "X-User-Id: 019b2c8d-11a0-7985-bdac-27db1f4b69f1" \
  http://localhost:8000/api/assignments/my-sources
```

---

## Important Notes

1. **X-User-Id header is REQUIRED** for all endpoints
2. **Admin ID** must be used for assignment endpoints
3. **Police ID** can be used to view their own assignments
4. Get actual IDs by running: `docker compose exec app python script/get_user_ids.py`
