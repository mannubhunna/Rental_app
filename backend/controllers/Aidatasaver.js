import axios from "axios";
import fs from "fs";
import path from "path";

const pathfile = path.join(process.cwd(), "data", "properties.json");

export const aiinput = async (req, res) => {
  try {
    const message  = req.body.prompt;

     console.log(message)
    const prompt = `You are a property information extraction API.

Your job is to convert the user's property request into JSON.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT return explanations.
4. Do NOT return extra text.

MANDATORY FIELDS:
- location
- budget
- propertyName

If ANY of these three fields are missing, unclear, or cannot be determined from the user's message, DO NOT return the property object.

Instead return EXACTLY this format:

{
  "success": false,
  "message": "Location, budget and property type are required.",
  "missingFields": [
    "location",
    "budget",
    "type"
  ]
}

Only include the actually missing fields in the missingFields array.

--------------------------------------------------
SUCCESS RESPONSE FORMAT
--------------------------------------------------

If all mandatory fields are present, return:

{
  "success": true,
  "data": {
    "id": <current timestamp in milliseconds>,
    "propertyName": "",
    "budget": 0,
    "type": "",
    "location": "",
    "furnished": "",
    "availableFor": "",
    "floor": "",
    "area": "",
    "independent": "",
    "maintenance": "",
    "facing": "",
    "parking": "",
    "description": "",
    "available": "",
    "image": "",
    "createdAt": "<current ISO date>"
  }
}

--------------------------------------------------
FIELD EXTRACTION RULES
--------------------------------------------------

budget
- Store ONLY the numeric amount.
- Remove ₹, commas, "Rs", "Lakhs", "Lakh", "K", "/month", etc.
- Examples:
  "₹18,000" → 18000
  "Rs 25000" → 25000
  "20k" → 20000
  "15 K" → 15000
- If budget is a range, use the maximum value.
  Example:
  "15k-18k" → 18000

propertyName
- This field represents ONLY the BHK configuration.
- Allowed values ONLY:
  "1 RK"
  "1 BHK"
  "2 BHK"
  "3 BHK"
  "4 BHK"
  "5 BHK"
- Do NOT include apartment names, society names, owner names, or any extra words.
- If BHK is not mentioned, return "N/A".

availableFor
- Allowed values ONLY:
  "Family"
  "Bachelor Boys"
  "Bachelor Girls"
  "Bachelor Anyone"
- Convert similar words:
  "Girls" → "Bachelor Girls"
  "Boys" → "Bachelor Boys"
  "Female" → "Bachelor Girls"
  "Male" → "Bachelor Boys"
  "Bachelor Both Girls and Boys" → "Bachelor Anyone"
  "Family Only" → "Family"
- If unclear, return "N/A".

type
Allowed values:
- Apartment
- Independent House
- Villa
- PG
- Room
- Studio
- Office
- Shop
- Plot

If another term is used, map it to the closest value.
Otherwise return "N/A".

furnished
Allowed values ONLY:
- Fully Furnished
- Semi Furnished
- Unfurnished

Otherwise return "N/A".

available
Allowed values ONLY:
- true
- false
- N/A

maintenance
- Store ONLY numeric value.
Example:
"Maintenance ₹2000" → 2000

floor
Examples:
Ground Floor
1st Floor
2nd Floor
3rd Floor
Top Floor
Otherwise "N/A"

parking
Allowed values:
Yes
No
N/A

independent
Allowed values:
Yes
No
N/A

facing
Examples:
North
South
East
West
North-East
North-West
South-East
South-West
Otherwise "N/A"

area
Store exactly as mentioned.
Example:
1200 sqft
900 sq ft
10 Marla

location
Store the full location exactly as mentioned.

description
Store the add details in description


image
Always return:
"N/A"
unless the user explicitly provides an image URL.

--------------------------------------------------
DEFAULT VALUES
--------------------------------------------------

Missing optional fields must be:
"N/A"

--------------------------------------------------
User Input:
${message}`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = JSON.parse(response.data.choices[0].message.content);


// AI validation
if (!result.success) {
  return res.status(400).json(result);
}

// Read existing file
let properties = [];

if (fs.existsSync(pathfile)) {
  const file = fs.readFileSync(pathfile, "utf8");
  properties = file ? JSON.parse(file) : [];
}

// Add new property object
properties.push(result.data);

// Save file
fs.writeFileSync(
  pathfile,
  JSON.stringify(properties, null, 2),
  "utf8"
);

   return res.status(201).json({
  success: true,
  message: "Property saved successfully.",
  data: result.data,
});

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};