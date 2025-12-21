import urllib.request
import urllib.parse
import json
import ssl

# Bypass SSL if needed (localhost)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

BASE_URL = "http://localhost:8000/api/v1"

def login():
    url = f"{BASE_URL}/auth/login"
    # API expects JSON, not Form-Encoded
    data = json.dumps({
        "email": "admin@system.com",
        "password": "Admin@123"
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/json")
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            if response.status == 200:
                body = response.read()
                token_data = json.loads(body)
                print("Login Successful!")
                return token_data.get("access_token")
            else:
                print(f"Login failed: {response.status}")
                return None
    except urllib.error.HTTPError as e:
        print(f"Login HTTP Error: {e.code} - {e.reason}")
        # Print response body if available
        try:
             print(e.read().decode())
        except:
             pass
        return None
    except Exception as e:
        print(f"Login Error: {e}")
        return None

def check_sources(token):
    url = f"{BASE_URL}/sources"
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {token}")
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            if response.status == 200:
                body = response.read()
                sources = json.loads(body)
                print(f"Found {len(sources)} sources via API:")
                for s in sources:
                    print(f"  - ID: {s['id']} | Name: {s['name']}")
                    
                # Check for the specific ID
                target_id = "019b2c8d-1211-7688-a110-31c03801452e"
                found = any(s['id'] == target_id for s in sources)
                if found:
                    print(f"\n✅ Target ID {target_id} FOUND in list.")
                else:
                    print(f"\n❌ Target ID {target_id} NOT found in list.")
            else:
                print(f"List Sources failed: {response.status}")
    except Exception as e:
        print(f"List Sources Error: {e}")

if __name__ == "__main__":
    print("Checking API...")
    token = login()
    if token:
        check_sources(token)
