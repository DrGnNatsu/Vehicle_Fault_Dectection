# Vehicle_Fault_Detection

A web-based platform that receives live camera streams and allows users to define custom fault detection rules using our own domain-specific language (DSL).

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v18+ (for frontend)
- **Python**: v3.11+
- **uv**: Fast Python package installer and resolver
- **Docker & Docker Compose**: For containerized deployment

---

## 1. Frontend (`fe_react`)

The frontend is a React application powered by Vite.

### Installation

Navigate to the frontend directory:
```bash
cd fe_react
```

Install dependencies:
```bash
npm install
# or if you use yarn
yarn
```

### Running Locally

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will typically run at `http://localhost:5173`.

---

## 2. Backend (`be_fastapi`)

The backend is built with FastAPI.

### Installation

Navigate to the backend directory:
```bash
cd be_fastapi
```

Install dependencies using `uv`:
```bash
uv sync
```

### Running Locally

1. **Activate the virtual environment**:

   - **Linux/macOS**:
     ```bash
     source .venv/bin/activate
     ```
   - **Windows**:
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```

2. **Install additional packages (if not already synced)**:
   ```bash
   uv add python-dotenv fastapi uvicorn pydantic-settings sqlalchemy
   ```

3. **Start the server**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The API docs will be available at `http://localhost:8000/docs`.

---

## 3. Running with Docker

You can run the entire system (Backend + Database) using Docker Compose.

**IMPORTANT**: All Docker commands must be run from the `be_fastapi` directory.

```bash
cd be_fastapi
```

### Start App and Database
```bash
docker-compose up -d
```

### Start Only App
```bash
docker-compose up -d app
```

### Start Only Database
```bash
docker-compose up -d db
```

---

## Database Migration (Alembic)

Migrations should be managed inside the Docker container to ensure consistency.

### Create Migration File
```bash
docker-compose exec app alembic revision --autogenerate -m "description of change"
```

### Apply Migrations
```bash
docker-compose exec app alembic upgrade head
```

### Check Database Tables
```bash
docker-compose exec db psql -U postgres -d vehicle_fault_db -c "\dt"
```

---

## Troubleshooting

### Rebuild Containers
If you added new dependencies or changed the Dockerfile:
```bash
docker-compose down
docker-compose up -d --build
```

### Remove Volumes (Reset DB)
**Warning**: This deletes all data.
```bash
docker-compose down -v
```

### Fix Corrupted Migrations
1. Remove the corrupted file:
   ```bash
   rm ./alembic/versions/<migration_file>.py
   ```
2. Regenerate the migration.

---

## Commit Convention

We follow **Conventional Commits**:
```text
feat: new feature
fix: bug fix
docs: documentation updates
refactor: code structure changes
build: docker or build system
```

Example:
```bash
git commit -m "feat(database): add user table"
```

---

## License
This project is for academic and internal team development.
