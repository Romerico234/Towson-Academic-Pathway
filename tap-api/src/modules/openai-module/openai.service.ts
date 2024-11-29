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
        This bot is designed to assist users in generating a comprehensive degree plan for their academic journey based on Towson University courses.

        Rules:
        - Carefully analyze the unofficial transcript provided by the user to identify completed courses, academic progress, and remaining requirements. This step is critical to ensure prerequisites, core curriculum requirements, and degree-specific requirements are correctly addressed.
        - Generate a general degree plan that considers:
        - Courses already completed (as verified in the unofficial transcript).
        - Remaining requirements for graduation.
        - The user's academic standing, ensuring prerequisite courses are included if missing.
        - The user's preferences, such as:
            - Preferred credit hours per semester.
            - Availability during summer/winter terms.
            - Unavailable terms.
        - Balance core curriculum, major-specific courses, and elective requirements across semesters while adhering to the user's preferences.
        - Address all core, major-specific, and elective requirements by scheduling them appropriately.
        - Handle prerequisites with care, ensuring prerequisite courses are added in the correct sequence to avoid scheduling conflicts or delays in the user's academic progress.
        - Include notes for any semester where conflicts arise or ambiguities exist in the transcript or preferences.

        Degree Plan Structure:
        [
            {
                "semester": "Fall 2025",
                "plannedCourses": ["COSC101 - Introduction to Computer Science", "MATH115 - College Algebra", "ENGL102 - Writing for a Liberal Education"],
                "creditHours": 12,
                "notes": "Focus on foundational courses in computer science and mathematics."
            },
            // Additional semesters...
        ]

        Important:
        - Use the unofficial transcript as the primary source to determine:
        - Courses already completed.
        - Courses that can be skipped.
        - Courses that need to be retaken.
        - If any required course (core, major, or elective) is missing, ensure it is included in the degree plan.
        - Clearly indicate any issues, conflicts, or ambiguities in the transcript data or user preferences in the notes section of the affected semester.

        Instructions:
        - Use the provided degree plan structure.
        - Return ONLY the JSON object containing the degree plan.
        - Ensure that the output adheres strictly to the format and rules specified above.
        `;
    }

    public async generatePlans(userData: any): Promise<any> {
        try {
            const { major } = userData;

            // Fetch necessary data
            const majorData = await this.majorService.getMajorByName(major);
            if (!majorData) throw new Error(`Major ${major} not found`);

            const coreRequirements = await this.coreService.getAllCores();
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
                max_tokens: 4096,
                temperature: 0.1,
            });

            const content = response.choices[0].message?.content;
            console.log("OpenAI Response:", content);

            if (content) {
                // Extract JSON and validate
                const degreePlan = this.extractJSON(content);
                this.validateDegreePlan(degreePlan);
                return degreePlan;
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
        prompt += `Unavailable Terms: ${
            Array.isArray(userData.unavailableTerms)
                ? userData.unavailableTerms.join(", ")
                : "None"
        }\n\n`;

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

        prompt += `Generate a degree plan based on the user's information and requirements. Ensure the structure matches the provided format.`;

        return prompt;
    }

    private extractJSON(content: string): any {
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const jsonString = jsonMatch[0];
                return JSON.parse(jsonString);
            } else {
                throw new Error("No JSON array found in the response");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            throw new OpenAIError("Failed to parse JSON from OpenAI response");
        }
    }

    private validateDegreePlan(degreePlan: any) {
        if (!Array.isArray(degreePlan)) {
            throw new Error("Invalid degree plan format: must be an array");
        }

        degreePlan.forEach((semester: any, index: number) => {
            if (
                !semester.semester ||
                !Array.isArray(semester.plannedCourses) ||
                typeof semester.creditHours !== "number"
            ) {
                throw new Error(
                    `Invalid degree plan structure at index ${index}`
                );
            }
        });
    }
}
