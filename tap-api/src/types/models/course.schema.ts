import mongoose, { Schema, Document } from "mongoose";
import { COLLECTION_NAMES } from "../mongoose/collection-names";

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
    units: number;
    gradingBasis: string;
    components: IComponent[];
    campus: string;
}

const ComponentSchema = new Schema<IComponent>({
    component: { type: String, required: true },
    required: { type: Boolean, required: true },
});

const CourseSchema = new Schema<ICourse>(
    {
        institution: { type: String, required: true },
        acadCareer: { type: String, required: true },
        subject: { type: String, required: true },
        catalogNumber: { type: String, required: true },
        courseTitle: { type: String, required: true },
        units: { type: Number, reqiured: true },
        termsOffered: { type: [String], default: [] },
        description: { type: String, default: "" },
        gradingBasis: { type: String, default: "" },
        components: { type: [ComponentSchema], default: [] },
        campus: { type: String, default: "" },
    },
    { collection: COLLECTION_NAMES.COURSE_DATA }
);

export default mongoose.model<ICourse>("Course", CourseSchema);
