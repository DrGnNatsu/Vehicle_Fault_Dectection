export interface GrammarRule {
  category: string;
  items: { text: string; description?: string }[];
}

export interface RuleRecipe {
  title: string;
  vnTitle?: string;
  logic: string;
  code: string;
}

export const dslGrammar = {
  structure: "IF <condition> THEN 'TRIGGER_VIOLATION'",
  keywords: ["IF", "THEN", "AND", "OR", "IN", "TRIGGER_VIOLATION"],
  comparators: [
    { op: "==", desc: "Equal" },
    { op: "!=", desc: "Not Equal" },
    { op: ">", desc: "Greater" },
    { op: "<", desc: "Less" },
    { op: ">=", desc: "Greater/Eq" },
    { op: "<=", desc: "Less/Eq" },
  ],
  fieldsObject: [
    { field: "class_name", desc: 'Enum: "car", "bus", "truck", "motorbike"', type: "string" },
    { field: "current_zone", desc: "zone identifier", type: "string" },
    { field: "speed_kmh", desc: "Vehicle speed", type: "number" },
    { field: "direction_angle", desc: "0-360 degrees", type: "number" },
    { field: "attributes.has_helmet", desc: "For motorbikes", type: "boolean" },
    { field: 'zone_duration_seconds("<zone_id>")', desc: "Time spent in zone", type: "function" },
  ],
  fieldsScene: [
    { field: "traffic_light_color", desc: 'Enum: "red", "green", "yellow"', type: "string" },
  ]
};

export const ruleRecipes: RuleRecipe[] = [
  {
    title: "Wrong Lane Violation",
    vnTitle: "Đi không đúng làn đường",
    logic: "Check if a vehicle class is inside a specific prohibited zone.",
    code: `IF object.class_name IN ("car", "bus", "truck")
AND object.current_zone == "motorbike_lane"
THEN TRIGGER_VIOLATION`
  },
  {
    title: "Illegal Stop/Parking",
    vnTitle: "Dừng, đỗ xe sai nơi quy định",
    logic: "Vehicle speed is near zero AND they have stayed in a \"no parking\" zone for longer than X seconds.",
    code: `IF object.speed_kmh < 5
AND object.zone_duration_seconds("no_parking_zone") > 10
THEN TRIGGER_VIOLATION`
  },
  {
    title: "Wrong Way",
    vnTitle: "Đi ngược chiều",
    logic: "Vehicle is moving in a direction angle that opposes traffic flow (e.g., between 150° and 210°).",
    code: `IF object.class_name IN ("car", "motorbike")
AND object.direction_angle > 150
AND object.direction_angle < 210
THEN TRIGGER_VIOLATION`
  },
  {
    title: "Red Light Violation",
    vnTitle: "Vượt đèn đỏ",
    logic: "The traffic light is red AND the vehicle is moving above a speed threshold (optionally inside an intersection zone).",
    code: `IF scene.traffic_light_color == "red"
AND object.speed_kmh > 10
AND object.current_zone == "intersection_zone"
THEN TRIGGER_VIOLATION`
  },
  {
    title: "No Helmet",
    vnTitle: "Không đội mũ bảo hiểm",
    logic: "Vehicle is a motorbike AND the has_helmet attribute is false.",
    code: `IF object.class_name == "motorbike"
AND object.attributes.has_helmet == false
THEN TRIGGER_VIOLATION`
  }
];
