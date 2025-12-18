# Traffic System Authentication Design (UC-01)

## 1. Architectural Overview
This system implements a **Layered Architecture** using Python (FastAPI). It strictly enforces separation of concerns to ensure scalability, security, and maintainability.

### Key Patterns Used
* **Layered Architecture:** Controller → Service → Repository.
* **DTO Pattern:** Pydantic models for strict input/output validation.
* **Unit of Work:** Database sessions are passed down to ensure transaction integrity.
* **Centralized Exception Handling:** Custom exceptions decouple business logic from HTTP responses.
* **Security Standard:** Argon2 hashing (via `passlib`) and JWT (Stateless Authentication).

---

## 2. High-Level Workflow
The login process follows a linear, secure flow:

1.  **Request:** User submits credentials (`email`, `password`) via HTTP POST.
2.  **Validation Layer:** The API validates the data format (e.g., valid email structure).
3.  **Repository Layer:** The system queries the database for the user record using the email.
4.  **Service Layer (Security):**
    * *User Check:* If user is missing, raise `AuthFailedException`.
    * *Password Check:* Verify input against stored hash using **Argon2**.
    * *Token Gen:* If valid, create a JWT (signed, expires in 30m).
5.  **Response:** The system returns the Access Token and User Role.
6.  **Error Handling:** Any logic failure raises a Python Exception, which the global handler catches to return a secure 401 JSON response (preventing user enumeration).

---

## 3. Sequence Diagram
This diagram illustrates the successful login flow and the unified error handling strategy.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant API as API Layer (Controller)
    participant SVC as Service Layer
    participant REP as Repository
    participant DB as Database
    participant EXC as Exception Handler

    Note over Client, API: 1. Submit Credentials
    Client->>API: POST /api/v1/token {email, password}
    
    Note over API: 2. Validate Input (DTO)
    alt Invalid Format
        API-->>Client: 422 Unprocessable Entity
    else Valid Format
        API->>SVC: authenticate_user(db, dto)
        
        Note over SVC, DB: 3. Fetch User
        SVC->>REP: get_by_email(email)
        REP->>DB: SELECT * FROM users WHERE email=?
        DB-->>REP: User Record (or None)
        REP-->>SVC: User Object

        Note over SVC: 4. Security Logic
        alt User Missing OR Hash Mismatch
            SVC-->>EXC: Raise AuthFailedException
            Note right of EXC: Global Handler catches error
            EXC-->>Client: 401 Unauthorized {"detail": "Incorrect credentials"}
        else Credentials Valid
            SVC->>SVC: Verify Argon2 Hash
            SVC->>SVC: Generate JWT (Sub=ID, Role, Exp=30m)
            SVC-->>API: TokenResponse
            
            Note over API, Client: 5. Success Response
            API-->>Client: 200 OK {access_token, role}
        end
    end