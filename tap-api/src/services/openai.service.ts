import OpenAI from "openai";
import { OpenAIError } from "../errors/errors";
import dotenv from "dotenv";
dotenv.config();

export class OpenAIService {
    private openai: OpenAI;
    private systemPrompt: string;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || "",
        });

        this.systemPrompt = `
    Towson Academic Pathway (TAP) is a platform that helps students plan their academic journey at Towson University. 
    This bot is designed to help users generate a plan for their academic journey based on Towson University courses.

    Rules:
    - The bot will generate a general degree plan based on the courses that are provided.
    - The bot will generate a general degree plan based on the user's academic requirements.
    - The bot will generate a general degree plan based on the user's academic standing.
    - The bot will generate a general degree plan based on the user's preferences.
    - The bot will generate a plan for the upcoming semester based on the degree plan and the courses that are provided.
    - The bot will return a JSON object containing the generated degree plan and the generated plan for the upcoming semester.
    
    Degree Plan Structure:
    degreePlan (Array of Objects): General academic outline
    - semester (String): Term, e.g., "Fall 2025"
    - plannedCourses (Array of Strings): Course names or subject areas
    - creditHours (Number): Total credit hours for that semester
    - notes (String, optional): Notes on the semester plan

    Active Semester Plan Structure:
    activeSemesterPlan (Object): Detailed schedule for the upcoming semester
    - courseCode (String): Course code, e.g., "COSC101"
    - title (String): Full course title
    - units (Number): Credit hours
    - schedule (Array of Objects): Class meeting details
        - day (String): Days, e.g., "MoWe"
        - startTime (String): Class start time
        - endTime (String): Class end time
        - location (String): Classroom or online location
        - instructor (String): Instructor's name.

    Example Result:
    {
        "degreePlan": [
          {
            "semester": "Fall 2025",
            "plannedCourses": ["COSC101 - Introduction to Computer Science", "MATH115 - College Algebra", "ENGL102 - Writing for a Liberal Education"],
            "creditHours": 12,
            "notes": "Focus on foundational courses in computer science and mathematics."
          },
          // ... additional semesters
        ],
        "activeSemesterPlan": {
          "courses": [
            {
              "courseCode": "COSC301",
              "title": "Software Engineering",
              "units": 3,
              "schedule": [
                {
                  "day": "MoWe",
                  "startTime": "10:00 AM",
                  "endTime": "11:15 AM",
                  "location": "Room 204, Computer Science Building",
                  "instructor": "Dr. Jane Doe"
                }
              ]
            },
            // ... additional courses
          ]
        }
      }  
      
    Again, just return the JSON object with the degree plan and the active semester plan.
    `;
    }

    public async generatePlans(userPrompt: string): Promise<any> {
        try {
            // TODO: Fetch relevant courses based on user prompt and send it to OpenAI

            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo", // NOTE: 4096 tokens ≈ 12,000–16,000 characters per message
                messages: [
                    { role: "system", content: this.systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                max_tokens: 1024,
            });

            const content = completion.choices[0].message?.content;
            console.log("OpenAI Response:", content);

            if (content) {
                const extractedContent = this.extractJson(content);
                return extractedContent;
            } else {
                throw new OpenAIError("No response from OpenAI API");
            }
        } catch (e: any) {
            console.error("OpenAI API error:", e);
            throw new OpenAIError(e.message || "OpenAI API error");
        }
    }

    private extractJson(content: string): any {
        try {
            const jsonStartIndex = content.indexOf("{");
            const jsonEndIndex = content.lastIndexOf("}");
            if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
                const jsonString = content.substring(
                    jsonStartIndex,
                    jsonEndIndex + 1
                );
                return JSON.parse(jsonString);
            } else {
                throw new Error("JSON not found in the response");
            }
        } catch (error) {
            console.error("JSON extraction error:", error);
            throw new OpenAIError("Failed to parse JSON from OpenAI response");
        }
    }
}
