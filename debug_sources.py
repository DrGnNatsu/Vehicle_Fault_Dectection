import sys
import os

# Add the app directory to sys.path to allow imports
sys.path.append(os.path.join(os.getcwd(), "be_fastapi/app"))

from database.session import SessionLocal
from models.sources import Source

def list_sources():
    db = SessionLocal()
    try:
        sources = db.query(Source).all()
        print(f"Found {len(sources)} sources in DB:")
        for s in sources:
            print(f"ID: {s.id} | Name: {s.name} | Active: {s.is_active}")
    except Exception as e:
        print(f"Error querying database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    list_sources()
