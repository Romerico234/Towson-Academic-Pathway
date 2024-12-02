export interface IPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    concentration: string;
    bachelorsDegree: string;
    unofficialTranscript: File | null;
    startDateSemester: string; 
    startDateYear: number; 
    expectedGraduationSemester: string;
    expectedGraduationYear: number;
    isHonorsStudent: boolean;
}
