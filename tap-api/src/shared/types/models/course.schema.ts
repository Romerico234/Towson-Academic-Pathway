import mongoose, { Schema, Document } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface IComponent {
    component: string;
    required: boolean;
}

export interface ICourse extends Document {
    institution: string;
    acadCareer: string;
    subject: string;
    catalogNumber: string;
    courseTitle: string;
    termsOffered: string[];
    description: string;
    units: string;
    gradingBasis: string;
    campus: string;
}

const CourseSchema = new Schema<ICourse>(
    {
        institution: { type: String, required: true },
        acadCareer: { type: String, required: true },
        subject: { type: String, required: true },
        catalogNumber: { type: String, required: true },
        courseTitle: { type: String, required: true },
        units: { type: String, reqiured: true },
        termsOffered: { type: [String], default: [] },
        description: { type: String, default: "" },
        gradingBasis: { type: String, default: "" },
        campus: { type: String, default: "" },
    },
    { collection: COLLECTION_NAMES.COURSE_DATA }
);

export default mongoose.model<ICourse>("Course", CourseSchema);
