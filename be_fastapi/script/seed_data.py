#!/usr/bin/env python3
"""
Seed script to populate database with initial data
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
import bcrypt
from app.database.session import SessionLocal
from app.models.user import User
from app.models.sources import Source
from app.models.police_source_assignment import PoliceSourceAssignment


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    # Encode password to bytes
    password_bytes = password.encode('utf-8')
    # Generate salt and hash
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Return as string (bcrypt hash format)
    return hashed.decode('utf-8')


def seed_users(db: Session):
    """Seed users: admin and police users"""
    print("Seeding users...")
    
    users_data = [
        {
            "email": "admin@example.com",
            "hashed_password": hash_password("admin123"),
            "role": "admin",
            "full_name": "Admin User",
            "is_active": True
        },
        {
            "email": "police1@example.com",
            "hashed_password": hash_password("police123"),
            "role": "police",
            "full_name": "Police Officer 1",
            "license_plate": "POL001",
            "is_active": True
        },
        {
            "email": "police2@example.com",
            "hashed_password": hash_password("police123"),
            "role": "police",
            "full_name": "Police Officer 2",
            "license_plate": "POL002",
            "is_active": True
        },
        {
            "email": "police3@example.com",
            "hashed_password": hash_password("police123"),
            "role": "police",
            "full_name": "Police Officer 3",
            "license_plate": "POL003",
            "is_active": True
        },
    ]
    
    created_users = {}
    for user_data in users_data:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if existing_user:
            print(f"  User {user_data['email']} already exists, skipping...")
            created_users[user_data["email"]] = existing_user
            continue
        
        user = User(**user_data)
        db.add(user)
        db.flush()  # Flush to get the ID
        created_users[user_data["email"]] = user
        print(f"  Created user: {user_data['email']} ({user_data['role']})")
    
    db.commit()
    return created_users


def seed_sources(db: Session):
    """Seed sources: cameras and files"""
    print("\nSeeding sources...")
    
    sources_data = [
        {
            "name": "Main Street Camera 1",
            "camera_url": "rtsp://camera1.example.com:554/stream",
            "source_type": "camera",
            "is_active": True
        },
        {
            "name": "Highway Camera 2",
            "camera_url": "rtsp://camera2.example.com:554/stream",
            "source_type": "camera",
            "is_active": True
        },
        {
            "name": "Intersection Camera 3",
            "camera_url": "rtsp://camera3.example.com:554/stream",
            "source_type": "camera",
            "is_active": True
        },
        {
            "name": "Parking Lot Camera 4",
            "camera_url": "rtsp://camera4.example.com:554/stream",
            "source_type": "camera",
            "is_active": True
        },
        {
            "name": "Traffic Video File 1",
            "file_path": "/static/videos/traffic_video_1.mp4",
            "source_type": "file",
            "duration": 3600,  # 1 hour in seconds
            "is_active": True
        },
        {
            "name": "Traffic Video File 2",
            "file_path": "/static/videos/traffic_video_2.mp4",
            "source_type": "file",
            "duration": 7200,  # 2 hours in seconds
            "is_active": True
        },
        {
            "name": "Downtown Camera 5",
            "camera_url": "rtsp://camera5.example.com:554/stream",
            "source_type": "camera",
            "is_active": True
        },
        {
            "name": "School Zone Camera 6",
            "camera_url": "rtsp://camera6.example.com:554/stream",
            "source_type": "camera",
            "is_active": False  # Inactive source for testing
        },
    ]
    
    created_sources = []
    for source_data in sources_data:
        # Check if source already exists (by name)
        existing_source = db.query(Source).filter(Source.name == source_data["name"]).first()
        if existing_source:
            print(f"  Source '{source_data['name']}' already exists, skipping...")
            created_sources.append(existing_source)
            continue
        
        source = Source(**source_data)
        db.add(source)
        db.flush()
        created_sources.append(source)
        print(f"  Created source: {source_data['name']} ({source_data['source_type']})")
    
    db.commit()
    return created_sources


def seed_assignments(db: Session, users: dict, sources: list):
    """Seed police-source assignments"""
    print("\nSeeding assignments...")
    
    # Get police users
    police1 = users.get("police1@example.com")
    police2 = users.get("police2@example.com")
    police3 = users.get("police3@example.com")
    
    if not all([police1, police2, police3]):
        print("  Warning: Not all police users found, skipping assignments...")
        return
    
    # Assignment configuration
    # Police 1: Sources 0, 1, 2 (first 3 sources)
    # Police 2: Sources 2, 3, 4 (overlapping with police 1)
    # Police 3: Sources 4, 5, 6 (different set)
    
    assignments_config = [
        {
            "police": police1,
            "source_indices": [0, 1, 2]  # First 3 sources
        },
        {
            "police": police2,
            "source_indices": [2, 3, 4]  # Sources 2, 3, 4
        },
        {
            "police": police3,
            "source_indices": [4, 5, 6]  # Sources 4, 5, 6
        },
    ]
    
    for config in assignments_config:
        police = config["police"]
        source_indices = config["source_indices"]
        
        # Delete existing assignments for this police
        db.query(PoliceSourceAssignment).filter(
            PoliceSourceAssignment.user_id == police.id
        ).delete()
        
        # Create new assignments
        assigned_sources = []
        for idx in source_indices:
            if idx < len(sources):
                source = sources[idx]
                assignment = PoliceSourceAssignment(
                    user_id=police.id,
                    source_id=source.id
                )
                db.add(assignment)
                assigned_sources.append(source.name)
        
        db.flush()
        print(f"  Assigned {len(assigned_sources)} sources to {police.full_name}: {', '.join(assigned_sources)}")
    
    db.commit()


def main():
    """Main seed function"""
    print("=" * 50)
    print("Starting Database Seeding")
    print("=" * 50)
    
    db: Session = SessionLocal()
    
    try:
        # Seed users
        users = seed_users(db)
        
        # Seed sources
        sources = seed_sources(db)
        
        # Seed assignments
        seed_assignments(db, users, sources)
        
        print("\n" + "=" * 50)
        print("Seeding completed successfully!")
        print("=" * 50)
        print("\nTest Credentials:")
        print("  Admin: admin@example.com / admin123")
        print("  Police 1: police1@example.com / police123")
        print("  Police 2: police2@example.com / police123")
        print("  Police 3: police3@example.com / police123")
        print("\nNote: Use the user IDs from the database as X-User-Id header")
        
    except Exception as e:
        print(f"\nError during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
