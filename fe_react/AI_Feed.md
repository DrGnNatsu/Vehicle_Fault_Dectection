**Act as:** Senior Frontend Developer
**Task:** Implement Admin Navigation, Rules Management, and Violations History.
**Tech Stack:** TypeScript, React, Tailwind CSS, **Shadcn UI** (Strict requirement).

**Context:**
You are refining the Admin Dashboard. We have three main objectives:
1.  **Refactor Navigation:** The admin menu is becoming crowded. You need to group items logically using Shadcn UI components.
2.  **Rules Management:** A CRUD interface for the "DSL Rules" that trigger violations (based on the provided API image).
3.  **Violations Log:** A view to see the actual detected violations (based on the provided Pydantic models).

---

### **Task 1: Admin Navigation Refactor**
**Requirement:** The navigation bar is too long. Use the **Shadcn UI `DropdownMenu`** component to group management links.

---

### **Task 2: Rules Management Page (CRUD)**
**Location:** `src/pages/admin/rules/`
**API Endpoint:** `/api/v1/rules` (See attached API table)
**Features:**
1.  **List Rules:** Fetch and display all rules (Columns: Name, Active Status, Created At).
2.  **Create Rule:** A form to create a new rule.
    * **Inputs:** `name` (Text), `dsl_content` (Text Area / Code Editor), `is_active` (Switch/Checkbox).
    * *Note:* The "dsl_content" is the logic string (e.g., "IF ... THEN ...").
3.  **Delete Rule:** Soft delete or hard delete based on the API `DELETE` endpoint.

**Types (from API Image):**
```typescript
interface Rule {
  id: string;
  name: string;
  dsl_content: string;
  is_active: boolean;
  created_by_id: string;
  created_at: string;
  updated_at: string;
}

interface CreateRulePayload {
  name: string;
  dsl_content: string;
}
```

Task 3: Violations History Page

Location: src/pages/admin/violations/ Purpose: Display the log of detected violations. Data Structure: Use the TypeScript equivalent of the provided Python Pydantic models.

TypeScript Interfaces (Converted from your Python code):
```python
interface Violation {
  id: string;
  source_id: string;
  rule_id: string;
  timestamp: string;
  detected_license_plate: string | null;
  evidence_url: string; // URL to image/video
  metadata: Record<string, any>;
}

interface ViolationListResponse {
  violations: Violation[];
  total: number;
  skip: number;
  limit: number;
}
```
UI Requirements:

Display a table of violations.

Include a thumbnail or link for evidence_url.

Show detected_license_plate clearly (highlight if present).

Assumption: Assume a standard GET /api/v1/violations endpoint exists that returns ViolationListResponse.