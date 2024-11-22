import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongoose/collection-names";

export interface IMeeting {
    days: string;
    startTime: string;
    endTime: string;
    buildingCode: string;
    room: string;
    facilityDescr: string;
}

export interface IInstructor {
    name: string;
    email: string;
}

export interface IEnrollmentInfo {
    status: string;
    classCapacity: number;
    enrollmentTotal: number;
    enrollmentAvailable: number;
    waitListCapacity: number;
    waitListTotal: number;
}

export interface ICourseSection extends Document {
    courseBridgeId: Types.ObjectId;
    termActive: string;
    classNumber: number;
    classSection: string;
    component: string;
    session: string;
    startDate: Date;
    endDate: Date;
    meetings: IMeeting[];
    instructors: IInstructor[];
    enrollmentInfo: IEnrollmentInfo;
    location: string;
}

const MeetingSchema = new Schema<IMeeting>({
    days: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    buildingCode: { type: String },
    room: { type: String },
    facilityDescr: { type: String },
});

const InstructorSchema = new Schema<IInstructor>({
    name: { type: String },
    email: { type: String },
});

const EnrollmentInfoSchema = new Schema<IEnrollmentInfo>({
    status: { type: String },
    classCapacity: { type: Number },
    enrollmentTotal: { type: Number },
    enrollmentAvailable: { type: Number },
    waitListCapacity: { type: Number },
    waitListTotal: { type: Number },
});

const CourseSectionSchema = new Schema<ICourseSection>(
    {
        courseBridgeId: {
            type: Schema.Types.ObjectId,
            ref: "CourseBridge",
            required: true,
        },
        termActive: { type: String, required: true },
        classNumber: { type: Number, required: true },
        classSection: { type: String, required: true },
        component: { type: String },
        session: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        meetings: { type: [MeetingSchema], default: [] },
        instructors: { type: [InstructorSchema], default: [] },
        enrollmentInfo: { type: EnrollmentInfoSchema },
        location: { type: String },
    },
    { collection: COLLECTION_NAMES.COURSE_SECTION }
);

export default mongoose.model<ICourseSection>(
    "CourseSection",
    CourseSectionSchema
);
