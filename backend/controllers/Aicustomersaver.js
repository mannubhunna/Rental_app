import axios from "axios";
import fs from "fs";
import path from "path";

const pathfile = path.join(process.cwd(), "data", "customers.json");


export const aicustomersaver = async (req, res) => {
  try {

    const message = req.body.prompt;

    console.log(message);


    const prompt = `
You are a customer requirement extraction API.

Your job is to convert the user's customer requirement into JSON.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT return explanations.
4. Do NOT return extra text.


MANDATORY FIELDS:

- Name
- budget
- location
- propertytype


If ANY mandatory field is missing, return EXACTLY:


{
 "success": false,
 "message": "Name, budget, location and property type are required.",
 "missingFields": []
}


--------------------------------------------------
SUCCESS RESPONSE FORMAT
--------------------------------------------------

If all mandatory fields are available return:


{
 "success": true,
 "data": {

    "id": <current timestamp in milliseconds>,

    "Name": "",

    "budget": 0,

    "location": "",

    "propertytype": "",

    "gender": "",

    "members": "",

    "profession": "",

    "organisation": "",

    "furnished": "",

    "floor": "",

    "independent": "",

    "parking": "",

    "createdAt": "<current ISO date>"
 }
}



--------------------------------------------------
FIELD EXTRACTION RULES
--------------------------------------------------


budget

- Store ONLY numeric amount.
- Remove ₹, commas, Rs, /month etc.

Examples:

₹15000 → 15000

20k → 20000


If range:

15000-20000

return:

20000



Name

- Store customer's full name.
- If name is not mentioned return "N/A"



location

- Store complete location exactly as mentioned.



propertytype

Allowed values ONLY:

"1 RK"
"1 BHK"
"2 BHK"
"3 BHK"
"4 BHK"
"5 BHK"
"PG"
"Room"
"Office"
"Shop"

If unclear return "N/A"



gender

Convert:

Male → Male

Female → Female

Family → Family


Otherwise:

"N/A"



members

Store number of family members.

Example:

"3 members"

→ 3


Otherwise:

"N/A"



profession

Store profession.

Example:

Software Engineer

Doctor

Business


Otherwise:

"N/A"



organisation

Store company/organisation name.

Example:

Infosys

TCS

Google


Otherwise:

"N/A"



furnished

Allowed values:

Fully Furnished

Semi Furnished

Unfurnished


Otherwise:

"N/A"



floor

Examples:

Ground Floor

1st Floor

2nd Floor


Otherwise:

"N/A"



independent

Allowed values:

Yes

No

N/A



parking

Allowed values:

Yes

No

N/A



--------------------------------------------------

User Input:

${message}

`;



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
          Authorization: `Bearer ${process.env.GROQ_API_KEY_CLIENT}`,
          "Content-Type": "application/json",
        },
      }
    );



    const result = JSON.parse(
      response.data.choices[0].message.content
    );



    // Validation
    if (!result.success) {
      return res.status(400).json(result);
    }



    // Read customers file

    let customers = [];


    if (fs.existsSync(pathfile)) {

      const file = fs.readFileSync(
        pathfile,
        "utf8"
      );

      customers = file ? JSON.parse(file) : [];

    }



    // Add customer

    customers.push(result.data);



    // Save

    fs.writeFileSync(
      pathfile,
      JSON.stringify(customers, null, 2),
      "utf8"
    );



    return res.status(201).json({

      success:true,

      message:"Customer saved successfully.",

      data:result.data

    });



  } catch(err){

    console.log(err);


    return res.status(500).json({

      success:false,

      message:err.message

    });

  }
};