import mongoose, { Schema } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface IGraduationDeadlines {
    May: string;
    August: string;
    December: string;
}

export interface IGeneralRequirements {
    graduationDeadlines: IGraduationDeadlines;
    minimumEarnedUnits: number;
    upperLevelUnits: number;
    coreCurriculumCompletion: boolean;
    majorRequirements: {
        minimumGpa: number;
        minimumGrade: number;
    };
    cumulativeGpaRequirement: number;
    postMatriculationUnits: number;
    finalUnitsInResidence: number;
    recordCorrectionDeadline: {
        days: number;
    };
}

export interface IDegreeType {
    type: string;
    requirementsReference: string;
    additionalRequirements?: any;
}

export interface ISatisfactoryProgress {
    requirements: string[];
}

export interface IDegreeRequirements {
    generalRequirements: IGeneralRequirements;
    degreeTypes: IDegreeType[];
    satisfactoryProgress: ISatisfactoryProgress;
}

export interface IHonorsCourse {
    name: string;
    options?: string[];
    units: number;
    notes?: string[];
}

export interface ICourseworkCategory {
    totalUnits: number;
    courses?: IHonorsCourse[];
    options?: string[];
    notes?: string[];
}

export interface IHonorsRequirements {
    totalUnitsRequired: number;
    coursework: {
        foundationsCourses: ICourseworkCategory;
        lowerLevelHonorsCoursework: ICourseworkCategory;
        upperLevelHonorsSeminars: ICourseworkCategory;
        experientialLearning: ICourseworkCategory;
    };
    goodStanding: any;
    gradingPolicy: string;
    additionalNotes: string[];
}

export interface IRequirements {
    degreeRequirements: IDegreeRequirements;
    honorsRequirements: IHonorsRequirements;
}

const GraduationDeadlinesSchema: Schema = new Schema({
    May: String,
    August: String,
    December: String,
});

const MajorRequirementsSchema: Schema = new Schema({
    minimumGpa: Number,
    minimumGrade: Number,
});

const RecordCorrectionDeadlineSchema: Schema = new Schema({
    days: Number,
});

const GeneralRequirementsSchema: Schema = new Schema({
    graduationDeadlines: GraduationDeadlinesSchema,
    minimumEarnedUnits: Number,
    upperLevelUnits: Number,
    coreCurriculumCompletion: Boolean,
    majorRequirements: MajorRequirementsSchema,
    cumulativeGpaRequirement: Number,
    postMatriculationUnits: Number,
    finalUnitsInResidence: Number,
    recordCorrectionDeadline: RecordCorrectionDeadlineSchema,
});

const DegreeTypeSchema: Schema = new Schema({
    type: String,
    requirementsReference: String,
    additionalRequirements: Schema.Types.Mixed,
});

const SatisfactoryProgressSchema: Schema = new Schema({
    requirements: [String],
});

const DegreeRequirementsSchema: Schema = new Schema({
    generalRequirements: GeneralRequirementsSchema,
    degreeTypes: [DegreeTypeSchema],
    satisfactoryProgress: SatisfactoryProgressSchema,
});

const HonorsCourseSchema: Schema = new Schema({
    name: String,
    options: [String],
    units: Number,
    notes: [String],
});

const CourseworkCategorySchema: Schema = new Schema({
    totalUnits: Number,
    courses: [HonorsCourseSchema],
    options: [String],
    notes: [String],
});

const HonorsRequirementsSchema: Schema = new Schema({
    totalUnitsRequired: Number,
    coursework: {
        foundationsCourses: CourseworkCategorySchema,
        lowerLevelHonorsCoursework: CourseworkCategorySchema,
        upperLevelHonorsSeminars: CourseworkCategorySchema,
        experientialLearning: CourseworkCategorySchema,
    },
    goodStanding: Schema.Types.Mixed,
    gradingPolicy: String,
    additionalNotes: [String],
});

const RequirementsSchema: Schema = new Schema(
    {
        degreeRequirements: DegreeRequirementsSchema,
        honorsRequirements: HonorsRequirementsSchema,
    },
    { collection: COLLECTION_NAMES.REQUIREMENTS }
);

export default mongoose.model<IRequirements & Document>(
    "Requirement",
    RequirementsSchema,
    COLLECTION_NAMES.REQUIREMENTS
);
