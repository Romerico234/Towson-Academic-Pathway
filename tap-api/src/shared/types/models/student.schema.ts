import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface AcademicInfo {
    [key: string]: any;
}

export interface Preferences {
    [key: string]: any;
}

export interface Course {
    subject: string;
    catalogNumber: string;
    title: string;
    units: number;
}

export interface SemesterPlan {
    semester: string;
    plannedCourses: Course[];
    creditHours: number;
    notes?: string;
}

export interface FavoriteSchedule {
    name: string;
    degreePlan: SemesterPlan[];
}

export interface IStudentData extends Document<Types.ObjectId> {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    studentId: string | null;
    firstName: string;
    lastName: string;
    email: string;
    academicInfo: AcademicInfo;
    preferences: Preferences;
    degreePlan: any;
    favorites: any[];
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
    subject: { type: String, required: true },
    catalogNumber: { type: String, required: true },
    title: { type: String, required: true },
    units: { type: Number, required: true },
});

const SemesterPlanSchema: Schema = new Schema({
    semester: { type: String, required: true },
    plannedCourses: { type: [CourseSchema], required: true },
    creditHours: { type: Number, required: true },
    notes: { type: String },
});

const FavoriteScheduleSchema: Schema = new Schema({
    name: { type: String, required: true },
    degreePlan: { type: Schema.Types.Mixed, required: true },
});

const StudentDataSchema: Schema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: "User", required: true },
        studentId: { type: String, default: null },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        academicInfo: { type: Schema.Types.Mixed, default: {} },
        preferences: { type: Schema.Types.Mixed, default: {} },
        degreePlan: { type: Schema.Types.Mixed, default: {} },
        favorites: { type: Schema.Types.Mixed, default: [] },
    },
    { timestamps: true, collection: COLLECTION_NAMES.STUDENT_DATA }
);

export default mongoose.model<IStudentData>("StudentData", StudentDataSchema);
