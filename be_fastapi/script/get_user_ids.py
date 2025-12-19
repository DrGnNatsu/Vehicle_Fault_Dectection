#!/usr/bin/env python3
"""
Helper script to get user IDs for API testing
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database.session import SessionLocal
from app.models.user import User


def main():
    """Print user IDs for API testing"""
    db = SessionLocal()
    
    try:
        users = db.query(User).order_by(User.email).all()
        
        print("=" * 70)
        print("User IDs for API Testing (use as X-User-Id header)")
        print("=" * 70)
        print()
        
        for user in users:
            print(f"Email: {user.email}")
            print(f"  Name: {user.full_name}")
            print(f"  Role: {user.role}")
            print(f"  ID:   {user.id}")
            print(f"  Active: {user.is_active}")
            print()
        
        print("=" * 70)
        print("Example API calls:")
        print("=" * 70)
        print()
        
        admin = next((u for u in users if u.role == "admin"), None)
        police = next((u for u in users if u.role == "police"), None)
        
        if admin:
            print(f"# Admin - Get all sources")
            print(f"curl -H 'X-User-Id: {admin.id}' http://localhost:8000/api/sources")
            print()
        
        if police:
            print(f"# Police - Get assigned sources")
            print(f"curl -H 'X-User-Id: {police.id}' http://localhost:8000/api/sources")
            print()
            print(f"# Police - Get my assignments")
            print(f"curl -H 'X-User-Id: {police.id}' http://localhost:8000/api/assignments/my-sources")
            print()
        
        if admin and police:
            print(f"# Admin - Assign sources to police")
            print(f"curl -X POST -H 'X-User-Id: {admin.id}' -H 'Content-Type: application/json' \\")
            print(f"  -d '{{\"police_id\": \"{police.id}\", \"source_ids\": []}}' \\")
            print(f"  http://localhost:8000/api/assignments")
            print()
        
    finally:
        db.close()


if __name__ == "__main__":
    main()
