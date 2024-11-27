export interface FormDataType {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    concentration: string;
    bachelorsDegree: string;
    unofficialTranscript: File | null;
    expectedGraduationSemester: string;
    expectedGraduationYear: number;

    // Preferences
    preferredCreditHours: number;
    allowSummerWinter: boolean;
    generalEducationCompleted: boolean;
    withdrawnCourses: boolean;
    unavailableTerms: string[];
    prerequisitesHandling: string;
    preferenceConflicts: string;
    additionalComments: string;
}
