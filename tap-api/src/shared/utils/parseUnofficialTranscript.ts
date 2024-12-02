import pdfParse from "pdf-parse";
import { UserService } from "../../modules/user-module/user.service";

// Subject codes from Towson University
const subjectCodes = new Set([
    "AADS",
    "ACCT",
    "AFST",
    "AHLT",
    "AMST",
    "ANTH",
    "ARAB",
    "ARED",
    "ART",
    "ARTH",
    "ASST",
    "ASTR",
    "BIOL",
    "BUSX",
    "CHEM",
    "CHNS",
    "CIS",
    "CLST",
    "COMM",
    "COSC",
    "CRMJ",
    "DANC",
    "DFST",
    "EBTM",
    "ECED",
    "ECSE",
    "EDUC",
    "EESE",
    "ELED",
    "EMF",
    "ENGL",
    "ENTR",
    "ENVS",
    "ESOL",
    "FIN",
    "FMST",
    "FORL",
    "FPLN",
    "FREN",
    "FRSC",
    "GEOG",
    "GEOL",
    "GERM",
    "GERO",
    "GRK",
    "HCMN",
    "HEBR",
    "HIST",
    "HLTH",
    "HONR",
    "HPED",
    "IDFA",
    "IDHP",
    "IDIS",
    "IDNM",
    "INST",
    "ISTC",
    "ITAL",
    "ITEC",
    "JPNS",
    "KNES",
    "LAST",
    "LATN",
    "LEGL",
    "LGBT",
    "LIBR",
    "LING",
    "LWAC",
    "MATH",
    "MBBB",
    "MCOM",
    "MKTG",
    "MNGT",
    "MSED",
    "MTRO",
    "MUED",
    "MUSA",
    "MUSC",
    "NURS",
    "OCTH",
    "ORIE",
    "PHIL",
    "PHSC",
    "PHYS",
    "PORT",
    "POSC",
    "PSYC",
    "REED",
    "RLST",
    "RUSS",
    "SCED",
    "SCIE",
    "SEMS",
    "SOCI",
    "SOSC",
    "SPAN",
    "SPED",
    "SPPA",
    "THEA",
    "TSEM",
    "WMST",
]);

export async function parseUnofficialTranscript(
    file: any,
    userEmail: string
): Promise<any> {
    try {
        const data = await pdfParse(file.buffer);
        const transcriptText = data.text;

        // Extract courses from the transcript
        const courses = extractCoursesFromTranscript(transcriptText);

        const coursesTakenSuccessfully: string[] = [];
        const coursesTakenFailedOrInProgress: string[] = [];
        let totalNumberOfCredits = 0;

        for (const course of courses) {
            const completedUnits = parseFloat(course.credits);

            const courseSubjectAndCatalog = `${course.subject} ${course.catalogNumber}`;
            if (completedUnits > 0) {
                coursesTakenSuccessfully.push(courseSubjectAndCatalog);
            } else {
                coursesTakenFailedOrInProgress.push(courseSubjectAndCatalog);
            }

            totalNumberOfCredits += completedUnits;
        }

        console.log("Courses taken successfully:", coursesTakenSuccessfully);
        console.log("Courses taken failed or in progress:", coursesTakenFailedOrInProgress);
        console.log("Total number of credits taken:", totalNumberOfCredits);

        const userService = new UserService();
        await userService.updateAcademicInfoByEmail(userEmail, {
            coursesTakenSuccessfully,
            coursesTakenFailedOrInProgress: coursesTakenFailedOrInProgress,
            totalNumberOfCreditsTaken: totalNumberOfCredits.toString(),
        });

        return {
            coursesTakenSuccessfully,
            coursesTakenFailed: coursesTakenFailedOrInProgress,
            totalNumberOfCreditsTaken: totalNumberOfCredits.toString(),
        };
    } catch (error) {
        console.error("Error parsing transcript:", error);
        throw new Error("Failed to parse transcript.");
    }
}

function extractCoursesFromTranscript(text: string): any[] {
    const courseSubjects: string[] = [];
    const courseCatalogNumbers: string[] = [];
    const completedUnits: string[] = [];

    const lines = text.split("\n");
    for (const line of lines) {
        const courseInfo = line.match(
            /([A-Za-z]+\s*\d+)\s*([\d.]+)\s*([A-F\S]+)/
        );

        if (courseInfo?.input) {
            let currentCourse = "";
            let currentNumber = "";
            let prev = "";
            let periodCount = 0;
            let isSubjectFound = false;
            let isCatalogNumberFound = false;

            for (let i = 0; i < courseInfo.input.length; i++) {
                const char = courseInfo.input[i];

                // 1. Handle course subject extraction
                if (!isSubjectFound && currentCourse.length <= 4) {
                    currentCourse += char;
                    if (subjectCodes.has(currentCourse.trim())) {
                        courseSubjects.push(currentCourse.trim());
                        isSubjectFound = true;
                        currentCourse = "";
                    }
                }

                // 2. Handle catalog number extraction
                if (isSubjectFound && !isCatalogNumberFound) {
                    if (currentNumber.length <= 3 && char.match(/^\d+$/)) {
                        currentNumber += char;
                        if (currentNumber.trim().length === 3) {
                            courseCatalogNumbers.push(currentNumber.trim());
                            isCatalogNumberFound = true;
                            currentNumber = "";
                        }
                    }
                }

                // 3. Handle completed units extraction
                if (isCatalogNumberFound) {
                    if (char === ".") {
                        periodCount++;
                    }
                    if (periodCount === 2) {
                        completedUnits.push(prev);
                        break;
                    } else {
                        prev = char;
                    }
                }
            }
        }
    }

    const courseMap: any[] = [];
    for (let i = 0; i < courseSubjects.length; i++) {
        courseMap.push({
            subject: courseSubjects[i],
            catalogNumber: courseCatalogNumbers[i],
            credits: completedUnits[i],
        });
    }

    return courseMap;
}
