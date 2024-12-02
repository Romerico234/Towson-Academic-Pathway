import { OpenAI } from "openai";
import { IOpenAIService } from "./interfaces/iopenai.service";
import { OpenAIError } from "../../shared/errors/errors";
import { MajorService } from "../major-module/major.service";
import { CoreService } from "../core-module/core.service";
import { RequirementsService } from "../requirements-module/requirements.service";
import { parseUnofficialTranscript } from "../../shared/utils/parseUnofficialTranscript";
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
        - Carefully analyze the user's academic and preferences data. This step is critical to ensure prerequisites, core curriculum requirements, and degree-specific requirements are correctly addressed.
        - Generate a general degree plan that considers the following:
            - Courses already completed.
            - Courses failed or in progress.
            - Remaining requirements for graduation.
            - The user's academic standing, specifically the total number of credits they have completed and the remaining number of credits required to meet the degree requirements. The total number of credits required for graduation is determined by both the overall degree requirements and the specific requirements for their chosen degree/bachelors program.
            - The user's preferences, such as:
                - Preferred credit hours per semester.
                - Availability during summer/winter terms.
                - Unavailable terms.
                - Etc.
        - Balance core curriculum, major-specific courses, and elective requirements across semesters while adhering to the user's preferences.
        - Address all core, major-specific, and elective requirements by scheduling them appropriately.
        - Handle prerequisites with care, ensuring prerequisite courses are added in the correct sequence to avoid scheduling conflicts or delays in the user's academic progress.
        - Include notes for any semester where conflicts arise or ambiguities exist in the transcript or preferences.
        - Ensure the degree plan includes all semesters (Fall, Winter, Spring, and Summer) within the user's academic timeline (from where they start to end), even if no courses are scheduled in some semesters.

        Degree Plan Structure:
        [
            {
                "semester": "Spring 2024",
                "plannedCourses": ["COSC109 - Computers and Creativity (3 units)", "MATH115 - College Algebra (3 units)", "ENGL102 - Writing for a Liberal Education (3 units)"],
                "creditHours": 9,
                "notes": "Focus on foundational courses in computer science and mathematics."
            },
            {
                "semester": "Summer 2024",
                "plannedCourses": [],
                "creditHours": 0,
                "notes": ""
            },
            {
                "semester": "Fall 2025",
                "plannedCourses": ["COSC175 - General Computer Science (4 units)", "MATH273 - Calculus I (4 units)", "ENGL317 -  WRITING FOR BUSINESS AND INDUSTRY (3 units)"],
                "creditHours": 11,
                "notes": "Mored advanced computer science and mathematics."
            },
            {
                "semester": "Winter 2025",
                "plannedCourses": [],
                "creditHours": 0,
                "notes": ""
            },
            // Additional semesters... (Ensure the degree plan includes all semesters (Fall, Winter, Spring, and Summer) within the user's academic timeline (from where they start to end), even if no courses are scheduled in some semesters)
        ]

        Important:
        - BE MINDFUL ON WHEN COURSES ARE OFFERED. Some courses are only offered in specific semesters.
        - If any required course (core, major, or elective) is missing, ensure it is included in the degree plan.
        - Clearly indicate any issues, conflicts, or ambiguities in the transcript data or user preferences in the notes section of the affected semester.

        Instructions:
        - Use the provided degree plan structure.
        - Return ONLY the JSON object containing the degree plan.
        - Ensure that the output adheres strictly to the format and rules specified above.
        `;
    }

    public async generatePlans(
        userData: any,
        unofficialTranscript: any
    ): Promise<any> {
        try {
            const { major, bachelorsDegree, concentration } = userData;
            let { isHonorsStudent } = userData;
            isHonorsStudent = isHonorsStudent === "true";

            const majorData =
                await this.majorService.getMajorByNameWithNoConcentration(
                    major
                );
            if (!majorData) throw new Error(`Major ${major} not found`);

            const concentrationData =
                await this.majorService.getConcentrationByMajorAndName(
                    major,
                    concentration
                );

            if (!concentrationData)
                throw new Error(`Concentration ${concentrationData} not found`);

            // Parse the unofficial transcript
            const parsedTranscript = await parseUnofficialTranscript(
                unofficialTranscript,
                userData.email
            );
            const coursesTakenSuccessfully =
                parsedTranscript.coursesTakenSuccessfully;
            const coursesTakenFailedOrInProgress =
                parsedTranscript.coursesTakenFailed;
            const totalNumberOfCreditsTaken =
                parsedTranscript.totalNumberOfCreditsTaken;

            const coreRequirements = await this.coreService.getFormattedCores();

            const generalDegreeRequirements =
                await this.requirementsService.getGeneralDegreeRequirementes();

            const bachelorsRequirements =
                await this.requirementsService.getDegreeRequirementByType(
                    bachelorsDegree
                );

            let honorsRequirements = null;
            if (isHonorsStudent) {
                honorsRequirements =
                    await this.requirementsService.getHonorsRequirements();
            }

            // Build the user prompt for OpenAI
            const userPrompt = this.buildPrompt(
                userData,
                majorData,
                concentrationData,
                coursesTakenSuccessfully,
                coursesTakenFailedOrInProgress,
                totalNumberOfCreditsTaken,
                coreRequirements,
                generalDegreeRequirements,
                bachelorsRequirements,
                honorsRequirements
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
        concentrationData: any,
        coursesTakenSuccessfully: any,
        coursesTakenFailedOrInProgress: any,
        totalNumberOfCreditsTaken: any,
        coreRequirements: any,
        generalDegreeRequirements: any,
        bachelorsRequirements: any,
        honorsRequirements: any
    ): string {
        let prompt = `User Information:\n`;
        prompt += `The user is pursuing a ${
            userData.bachelorsDegree
        } and is majoring in ${userData.major} with a concentration in ${
            userData.concentration || "None"
        }. `;
        prompt += userData.isHonorsStudent
            ? `The user is also an honors student. `
            : "";
        prompt += `The user's degree plan should start on: ${userData.startDateSemester} ${userData.startDateYear} and they have an expected graduation of: ${userData.expectedGraduationSemester} ${userData.expectedGraduationYear}. `;
        prompt += `The user prefers to take ${userData.preferredCreditHours} credit hours per semester. However, this is not an ultimatum and can vary especially since this is a range. `;
        prompt += `The user prefers to take ${userData.summerWinterCoursesFrequency} courses during the summer and winter terms. However, this is also not an ultimatum and can be more or less than the preferred frequency. But, favor towards less. `;
        if (
            Array.isArray(userData.unavailableTerms) &&
            userData.unavailableTerms.length > 0
        ) {
            prompt += `The user is unavailable during the following terms: ${userData.unavailableTerms.join(
                ", "
            )}`;
        }
        prompt += `\n\nThis is the user's academic standing which includes the courses they have taken successfully, courses that are in progress or failed, and the total number of credits they have taken:\n`;
        prompt += `Courses Taken Successfully: ${coursesTakenSuccessfully.toString()}\n`;
        prompt += `Courses Taken Failed or In Progress: ${coursesTakenFailedOrInProgress.toString()}\n`;
        prompt += `Total Number of Credits Taken: ${totalNumberOfCreditsTaken}\n`;

        prompt += `\nThis is the general degree requirements that all Towson University students must complete and fulfill:\n${JSON.stringify(
            generalDegreeRequirements,
            null,
            2
        )}\n\n`;
        prompt += `These are the core requirements that all Towson University students must complete, with each section being fulfilled at least once.”:\n${JSON.stringify(
            coreRequirements,
            null,
            2
        )}\n\n`;
        prompt += `This is the user's specific bachelor's degree requirements that they must complete and fulfill:\n${JSON.stringify(
            bachelorsRequirements,
            null,
            2
        )}\n\n`;
        prompt += `This is the user's major requirement that they must complete and fulfill:\n${JSON.stringify(
            majorData,
            null,
            2
        )}\n\n`;
        if (concentrationData) {
            prompt += `This is the user's requirements for their concentration that they must complete and fulfill:\n${JSON.stringify(
                concentrationData,
                null,
                2
            )}\n\n`;
        }
        if (honorsRequirements) {
            prompt += `This is the honors requirements that all Towson University honors students must complete and fulfill:\n${JSON.stringify(
                honorsRequirements,
                null,
                2
            )}\n\n`;
        }

        prompt += `\nGenerate a degree plan based on the user's information and requirements. Ensure the structure matches the provided format.`;

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
