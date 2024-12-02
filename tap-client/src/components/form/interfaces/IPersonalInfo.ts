export interface IPersonalInfo {
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
