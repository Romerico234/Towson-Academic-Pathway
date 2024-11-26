import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

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
    units: string;
    schedule: Schedule[];
}

export interface FavoriteSchedule {
    name: string;
    courses: ActiveSemesterPlan[];
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
    degreePlans: SemesterPlan[];
    favorites: FavoriteSchedule[];
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
    units: { type: String, required: true },
    schedule: { type: [ScheduleSchema], required: true },
});

const FavoriteScheduleSchema: Schema = new Schema({
    name: { type: String, required: true },
    courses: { type: [ActiveSemesterPlanSchema], required: true },
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
        email: { type: String, required: true },
        academicInfo: { type: Schema.Types.Mixed, default: {} },
        preferences: { type: Schema.Types.Mixed, default: {} },
        degreePlans: { type: [SemesterPlanSchema], default: [] },
        favorites: { type: [FavoriteScheduleSchema], default: [] },
    },
    { timestamps: true, collection: COLLECTION_NAMES.STUDENT_DATA }
);

export default mongoose.model<IStudentData>("StudentData", StudentDataSchema);
