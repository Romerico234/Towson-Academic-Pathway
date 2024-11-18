import { ObjectId } from "mongodb";

export interface AcademicInfo {
    [key: string]: any; 
}

export interface Preferences {
    [key: string]: any; 
}

export interface SemesterPlan {
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes?: string;
}

export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    instructor: string;
}

export interface ActiveSemesterPlan {
    courseCode: string;
    title: string;
    units: number;
    schedule: Schedule[];
}

export interface StudentData {
    _id?: ObjectId;
    studentId: string | null; 
    firstName: string;
    lastName: string;
    academicInfo: AcademicInfo;
    preferences: Preferences;
    degreePlan: SemesterPlan[];
    activeSemesterPlan: ActiveSemesterPlan | null; 
    createdAt: Date;
}
