import { OpenAI } from "openai";
import { IOpenAIService } from "./interfaces/iopenai.service";
import { OpenAIError } from "../../shared/errors/errors";
import { MajorService } from "../major-module/major.service";
import { CoreService } from "../core-module/core.service";
import { RequirementsService } from "../requirements-module/requirements.service";
import dotenv from "dotenv";

dotenv.config();

export class OpenAIService implements IOpenAIService {
    private openai: OpenAI;
    private majorService: MajorService;
    private coreService: CoreService;
    private requirementsService: RequirementsService;
    private systemPrompt: string;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error(
                "OPENAI_API_KEY is not set in the environment variables"
            );
        }

        this.openai = new OpenAI({
            apiKey: apiKey,
        });

        this.majorService = new MajorService();
        this.coreService = new CoreService();
        this.requirementsService = new RequirementsService();

        this.systemPrompt = `
Towson Academic Pathway (TAP) is a platform that helps students plan their academic journey at Towson University. 
This bot is designed to help users generate a plan for their academic journey based on Towson University courses.

Rules:
- The bot must carefully analyze the unofficial transcript provided by the user to identify completed courses, academic progress, and remaining requirements. This step is critical to ensure that prerequisites, core curriculum requirements, and degree-specific requirements are correctly handled.
- The bot will generate a general degree plan based on the courses that are already completed (as verified in the unofficial transcript) and the remaining requirements for graduation.
- The bot will generate a general degree plan based on the user's academic standing, ensuring prerequisite courses are included if missing.
- The bot will generate a general degree plan based on the user's preferences, including their preferred credit hours, allowance for summer/winter terms, and unavailable terms.
- The bot must ensure that core curriculum, major-specific courses, and elective requirements are balanced across semesters while adhering to the user's preferences.
- The bot will generate a plan for the upcoming semester based on the degree plan, ensuring prerequisite order, and providing a well-structured plan aligned with the user's preferences and academic standing.
- The bot must account for conflicts in preferences (e.g., prioritizing specific instructors or times) and adjust the plan accordingly.
- The bot must flag any issues or conflicts, such as prerequisites not met or scheduling overlaps, in the output.

Degree Plan Structure:
degreePlan (Array of Objects): General academic outline
- semester (String): Term, e.g., "Fall 2025"
- plannedCourses (Array of Strings): Course names or subject areas
- creditHours (Number): Total credit hours for that semester
- notes (String, optional): Notes on the semester plan

Active Semester Plan Structure:
activeSemesterPlan (Object): Detailed schedule for the upcoming semester
- courses (Array of Objects):
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

Important:
- The unofficial transcript must be the primary source for determining completed courses and identifying courses that can be skipped or need to be retaken.
- If any required course (core, major, or elective) is missing, the bot must include it in the degree plan.
- Handle prerequisites with care. Ensure prerequisite courses are added in the correct order to avoid scheduling conflicts or delays in the student's progress.
- If conflicts arise or there is ambiguity in the transcript data, the bot must clearly indicate these issues in the notes section.

Again, just return the JSON object with the degree plan and the active semester plan.
`;
    }

    public async generatePlans(userData: any): Promise<any> {
        try {
            // Extract user data
            const { major } = userData;

            // Fetch major requirements
            const majorData = await this.majorService.getMajorByName(major);

            if (!majorData) {
                throw new Error(`Major ${major} not found`);
            }

            // Fetch core curriculum requirements
            const coreRequirements = await this.coreService.getAllCores();

            // Fetch degree and honors requirements
            const degreeRequirements =
                await this.requirementsService.getRequirements();

            // Build the OpenAI prompt
            const userPrompt = this.buildPrompt(
                userData,
                majorData,
                coreRequirements,
                degreeRequirements
            );

            const assistantId = process.env.OPENAI_ASSISTANT_ID || "";

            const response = await this.openai.chat.completions.create({
                messages: [
                    { role: "system", content: this.systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                model: "gpt-4o",
                user: assistantId,
                max_tokens: 1024,
            });

            const content = response.choices[0].message?.content;
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

    private buildPrompt(
        userData: any,
        majorData: any,
        coreRequirements: any,
        degreeRequirements: any
    ): string {
        let prompt = `User Information:\n`;
        prompt += `First Name: ${userData.firstName}\n`;
        prompt += `Last Name: ${userData.lastName}\n`;
        prompt += `Email: ${userData.email}\n`;
        prompt += `Bachelor's Degree: ${userData.bachelorsDegree}\n`;
        prompt += `Major: ${userData.major}\n`;
        prompt += `Concentration: ${userData.concentration || "None"}\n`;
        prompt += `Expected Graduation: ${userData.expectedGraduationSemester} ${userData.expectedGraduationYear}\n`;
        prompt += `Preferred Credit Hours per Semester: ${userData.preferredCreditHours}\n`;
        prompt += `Allow Summer/Winter Classes: ${
            userData.allowSummerWinter ? "Yes" : "No"
        }\n`;
        prompt += `General Education Completed: ${
            userData.generalEducationCompleted ? "Yes" : "No"
        }\n`;
        prompt += `Withdrawn Courses: ${
            userData.withdrawnCourses ? "Yes" : "No"
        }\n`;
        prompt += `Unavailable Terms: ${
            Array.isArray(userData.unavailableTerms)
                ? userData.unavailableTerms.join(", ")
                : "None"
        }\n`;

        prompt += `Prerequisites Handling: ${userData.prerequisitesHandling}\n`;
        prompt += `Preference Conflicts: ${userData.preferenceConflicts}\n`;
        prompt += `Additional Comments: ${userData.additionalComments}\n\n`;

        prompt += `Major Requirements:\n${JSON.stringify(
            majorData,
            null,
            2
        )}\n\n`;
        prompt += `Core Requirements:\n${JSON.stringify(
            coreRequirements,
            null,
            2
        )}\n\n`;
        prompt += `Degree Requirements:\n${JSON.stringify(
            degreeRequirements,
            null,
            2
        )}\n\n`;

        prompt += `Based on the above information, generate a degree plan as per the specified format.`;

        return prompt;
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
