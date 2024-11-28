import mongoose, { Document, Schema } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface ICore extends Document {
    name: string;
    code: string;
    institution: string;
    acadCareer: string;
    subject: string;
    description: string;
    units: number | string;
    minimumGrade: string;
    gradingBasis: string;
    courses: string[];
    learningOutcomes: string[];
}

const CoreSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        institution: { type: String, required: true },
        acadCareer: { type: String, required: true },
        subject: { type: String, required: true },
        description: { type: String, required: true },
        units: { type: String, required: true },
        minimumGrade: { type: String, required: true },
        gradingBasis: { type: String, required: true },
        courses: [{ type: String, required: true }],
        learningOutcomes: [{ type: String, required: true }],
    },
    { collection: COLLECTION_NAMES.CORE_DATA }
);

export default mongoose.model<ICore>("Core", CoreSchema);
