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
5.  pip install python-dotenv
    pip install fastapi uvicorn
    pip install pydantic-settings

6. chạy docker:
    docker-compose up -d                            # compose db lẫn app
    
    ***
    docker-compose up -d app                        # compose chỉ app
    docker-compose up -d db                         # compose chỉ db
    ***
7. tạo migration file
    docker-compose exec app alembic revision --autogenerate -m "init db schema"

    # copy file từ trong docker ra
    docker-compose cp app:/app/alembic/versions/. ./alembic/versions/        

    # Chạy migrate 
    docker-compose exec app alembic upgrade head


    ***
    # Rebuild docker khi bị lỗi
    docker-compose down                             # dừng mọi thứ 
    (hoặc dừng volume (docker-compose down -v))
    docker-compose up -d --build                    # rebuild

    # Khi file migration bị lỗi
    rm ./alembic/versions/800c9bcd8d18_init_db_schema.py   # xóa migration file

    # Khi file migration bị trống
    Tự generate thủ công, mở file trống ra paste thủ công vào (gửi riêng).
    ***

8. Check database:
docker-compose exec db psql -U postgres -d vehicle_fault_db -c "\dt"
                    List of tables
 Schema |           Name            | Type  |  Owner
--------+---------------------------+-------+----------
 public | alembic_version           | table | postgres
 public | cameras                   | table | postgres
 public | police_camera_assignments | table | postgres
 public | rules                     | table | postgres
 public | users                     | table | postgres
 public | violations                | table | postgres
 public | zones                     | table | postgres
(7 rows)