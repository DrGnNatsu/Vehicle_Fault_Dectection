# Vehicle_Fault_Dectection
A web-based platform that receives live camera streams and allows users to define custom fault detection rules using our own domain-specific language (DSL).

# Running `be_fastapi`
1. Make sure your system already install `uv`
2. Cd `be_fasapi`
3. Install dependency
    ```python
    uv sync
    ```
4. Activate venv

    - For linux:
        ```
        source .venv/bin/activate
        ```
     
    - For Windows:
        ```
        .\.venv\Scripts\Activate.ps1
        ```
5. Install additional packages:
```python
    uv add python-dotenv fastapi uvicorn pydantic-settings sqlalchemy

```

# Running with doocker
## Start both app and db

```python
    docker-compose up -d
```

## Start only the app
```python
docker-compose up -d app
```

## Start only the db
```python
docker-compose up -d db
```
--- 
# Database Migration (Alembic)

## Create migration file

```python
docker-compose exec app alembic revision --autogenerate -m "init db schema"
```


## Copy migration file from container
```python
docker-compose cp app:/app/alembic/versions/. ./alembic/versions/
```


## Apply migration
```python
docker-compose exec app alembic upgrade head
```

---

# Troubleshooting

## Rebuild containers

```python
docker-compose down
docker-compose up -d --build
```


## Remove volumes (if needed)

```python
docker-compose down -v
```


## Fix migration file issues

### 1. Migration file is corrupted (remove migration file then compose the migration file again)

```python
rm ./alembic/versions/<migration_file>.py
```

### 2. Migration file is empty
Open the file and paste the manually generated migration script.

---

# Check Database Tables
```python
docker-compose exec db psql -U postgres -d vehicle_fault_db -c "\dt"
```


Expected tables:
- alembic_version  (table alembic generate)
- users  
- cameras  
- zones  
- rules  
- violations  
- police_camera_assignments  

---

# Commit Convention

We follow **Conventional Commits**:
```python
feat: new feature
fix: bug fix
docs: documentation updates
refactor: code structure changes
build: docker or build system
```
For example:

```python
git commit -m "feat(database): add full database models and initial migration" -m "Adds SQLAlchemy models, Alembic configuration, and the initial database migration with PostgreSQL 18 support. It includes tables for users, cameras, zones, rules, violations, and police assignments."
```

Branch naming:

```python
feature/<name>
bugfix/<name>
docs/<name>
hotfix/<name>
```


---

# Notes
- `.env` must not be committed.
- Migrations should always be run inside Docker.
- PostgreSQL 18 requires `pgcrypto` for UUID generation.

---

# License
This project is for academic and internal team development.

---

# Contact
For issues, please open a GitHub issue or contact the development team.

