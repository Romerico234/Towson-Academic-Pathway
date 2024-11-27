export interface IPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    concentration: string;
    bachelorsDegree: string;
    unofficialTranscript: File | null;
    expectedGraduationSemester: string;
    expectedGraduationYear: number;
}
