**Act as:** Technical Writer / Frontend Developer
**Task:** Create the "Violation Detection Rules (DSL)" documentation content and React display component.
**Context:**
We need a user-facing documentation page that explains how to write rules for the system. The content is derived from the "DSL" technical document provided. The page should consist of a **Grammar Reference** section and a **Common Recipes/Examples** section.

**Content to Implement:**

### Part 1: DSL Grammar Reference
Please render this as a clear reference table or list.

* **Structure:** `IF <condition> THEN 'TRIGGER_VIOLATION'`
* **Keywords:** `IF`, `THEN`, `AND`, `OR`, `IN`, `TRIGGER_VIOLATION`
* **Comparators:** `==` (Equal), `!=` (Not Equal), `>` (Greater), `<` (Less), `>=` (Greater/Eq), `<=` (Less/Eq)
* **Available Fields (Objects):**
    * `object.class_name` (Enum: "car", "bus", "truck", "motorbike")
    * `object.current_zone` (String: zone identifier)
    * `object.speed_kmh` (Number)
    * `object.direction_angle` (Number: 0-360 degrees)
    * `object.attributes.has_helmet` (Boolean: true/false)
    * `object.zone_duration_seconds("<zone_id>")` (Function: returns seconds in zone)
* **Available Fields (Scene):**
    * `scene.traffic_light_color` (Enum: "red", "green", "yellow")

---

### Part 2: Rule Recipes (Examples)
Please create a section for each violation type with the explanation and the code snippet.

#### **1. Wrong Lane Violation (Đi không đúng làn đường)**
* **Logic:** Check if a vehicle class is inside a specific prohibited zone.
* **Code Example:**
    ```sql
    IF object.class_name IN ("car", "bus", "truck")
    AND object.current_zone == "motorbike_lane"
    THEN TRIGGER_VIOLATION
    ```
* **Advanced (Negative Logic):**
    ```sql
    IF object.class_name == "car"
    AND object.current_zone != "car_lane"
    THEN TRIGGER_VIOLATION
    ```

#### **2. Illegal Stop/Parking (Dừng, đỗ xe sai nơi quy định)**
* **Logic:** Vehicle speed is near zero AND they have stayed in a "no parking" zone for longer than X seconds.
* **Code Example:**
    ```sql
    IF object.speed_kmh < 5
    AND object.zone_duration_seconds("no_parking_zone") > 10 SECONDS
    THEN TRIGGER_VIOLATION
    ```

#### **3. Wrong Way (Đi ngược chiều)**
* **Logic:** Vehicle is moving in a direction angle that opposes traffic flow (e.g., between 150° and 210°).
* **Code Example:**
    ```sql
    IF object.class_name IN ("car", "motorbike")
    AND object.direction_angle > 150
    AND object.direction_angle < 210
    THEN TRIGGER_VIOLATION
    ```

#### **4. Red Light Violation (Vượt đèn đỏ)**
* **Logic:** The traffic light is red AND the vehicle is moving above a speed threshold (optionally inside an intersection zone).
* **Code Example:**
    ```sql
    IF scene.traffic_light_color == "red"
    AND object.speed_kmh > 10
    AND object.current_zone == "intersection_zone"
    THEN TRIGGER_VIOLATION
    ```

#### **5. No Helmet (Không đội mũ bảo hiểm)**
* **Logic:** Vehicle is a motorbike AND the `has_helmet` attribute is false.
* **Code Example:**
    ```sql
    IF object.class_name == "motorbike"
    AND object.attributes.has_helmet == false
    THEN TRIGGER_VIOLATION
    ```

**Deliverables:**
1.  **`src/data/dslDocumentation.ts`**: A structured JSON/Object containing these rules (titles, descriptions, and code strings).
2.  **`src/pages/admin/rules/Documentation.tsx`**: A component that iterates over this data and renders a clean documentation UI (use a syntax highlighter component for the code blocks if possible).