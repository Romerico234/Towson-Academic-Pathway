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
    plannedCourses: string[];
    creditHours: number;
    notes?: string;
}

export interface FavoriteSchedule {
    name: string;
    degreePlan: SemesterPlan[];
}

export interface IUser extends Document<Types.ObjectId> {
    _id: Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    academicInfo: AcademicInfo;
    preferences: Preferences;
    degreePlan: SemesterPlan[];
    favorites: FavoriteSchedule[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        academicInfo: { type: Schema.Types.Mixed, default: {} },
        preferences: { type: Schema.Types.Mixed, default: {} },
        degreePlan: {
            type: [
                {
                    semester: { type: String, required: true },
                    plannedCourses: { type: [String], required: true },
                    creditHours: { type: Number, required: true },
                    notes: { type: String },
                },
            ],
            default: [],
        },
        favorites: {
            type: [
                {
                    name: { type: String, required: true },
                    degreePlan: {
                        type: [
                            {
                                semester: { type: String, required: true },
                                plannedCourses: {
                                    type: [String],
                                    required: true,
                                },
                                creditHours: { type: Number, required: true },
                                notes: { type: String },
                            },
                        ],
                        required: true,
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true, collection: COLLECTION_NAMES.USER_DATA }
);

export default mongoose.model<IUser>("User", UserSchema);
