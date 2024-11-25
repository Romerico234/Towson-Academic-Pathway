import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongoose/collection-names";

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

export interface IStudentData extends Document<Types.ObjectId> {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    studentId: string | null;
    firstName: string;
    lastName: string;
    academicInfo: AcademicInfo;
    preferences: Preferences;
    degreePlan: SemesterPlan[];
    activeSemesterPlan: ActiveSemesterPlan | null;
    createdAt: Date;
    updatedAt: Date;
}

const ScheduleSchema: Schema = new Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    instructor: { type: String, required: true },
});

const ActiveSemesterPlanSchema: Schema = new Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    units: { type: Number, required: true },
    schedule: { type: [ScheduleSchema], required: true },
});

const SemesterPlanSchema: Schema = new Schema({
    semester: { type: String, required: true },
    plannedCourses: { type: [String], required: true },
    creditHours: { type: Number, required: true },
    notes: { type: String },
});

const StudentDataSchema: Schema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: "User", required: true },
        studentId: { type: String, default: null },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        academicInfo: { type: Schema.Types.Mixed, default: {} },
        preferences: { type: Schema.Types.Mixed, default: {} },
        degreePlan: { type: [SemesterPlanSchema], default: [] },
        activeSemesterPlan: { type: ActiveSemesterPlanSchema, default: null },
    },
    { timestamps: true, collection: COLLECTION_NAMES.STUDENT_DATA}
);

export default mongoose.model<IStudentData>("StudentData", StudentDataSchema);
