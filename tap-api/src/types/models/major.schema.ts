import mongoose, { Document, Schema } from "mongoose";
import { COLLECTION_NAMES } from "../mongoose/collection-names";

interface ICourse {
    code: string;
    courseTitle: string;
    units: number | string;
    prerequisites?: string[];
    corequisites?: string[];
}

interface IGeneralRequirements {
    requiredCourses: {
        computerScience: ICourse[];
        math: ICourse[];
    };
    electives?: {
        computerScience: ICourse[];
    };
    scienceRequirement?: {
        labCourses: ICourse[];
    };
    mathElective?: ICourse[];
    otherRequirements?: ICourse[];
}

interface IConcentration {
    name: string;
    totalUnits: string;
    requirements: {
        requiredCourses?: {
            [key: string]: ICourse[];
        };
        electives?: {
            [key: string]: ICourse[];
        };
    };
}

export interface IMajor extends Document {
    name: string;
    totalUnits: string;
    generalRequirements: IGeneralRequirements;
    concentrations: IConcentration[];
    notes?: string[];
}

const CourseSchema: Schema = new Schema({
    code: { type: String, required: true },
    courseTitle: { type: String, required: true },
    units: { type: Schema.Types.Mixed, required: true },
    prerequisites: [{ type: String }],
    corequisites: [{ type: String }],
});

const GeneralRequirementsSchema: Schema = new Schema({
    requiredCourses: {
        computerScience: [CourseSchema],
        math: [CourseSchema],
    },
    electives: {
        computerScience: [CourseSchema],
    },
    scienceRequirement: {
        labCourses: [CourseSchema],
    },
    mathElective: [CourseSchema],
    otherRequirements: [CourseSchema],
});

const ConcentrationSchema: Schema = new Schema({
    name: { type: String, required: true },
    totalUnits: { type: String, required: true },
    requirements: {
        requiredCourses: {
            type: Schema.Types.Mixed, // Key-value pairs for categories
        },
        electives: {
            type: Schema.Types.Mixed,
        },
    },
});

const MajorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        totalUnits: { type: String, required: true },
        generalRequirements: GeneralRequirementsSchema,
        concentrations: [ConcentrationSchema],
        notes: [{ type: String }],
    },
    { collection: COLLECTION_NAMES.MAJOR_DATA }
);

export default mongoose.model<IMajor>("Major", MajorSchema);
