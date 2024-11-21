import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICourseBridge extends Document {
    courseId: Types.ObjectId;
    courseSections: Types.ObjectId[];
}

const CourseBridgeSchema = new Schema<ICourseBridge>({
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    courseSections: [{ type: Schema.Types.ObjectId, ref: "CourseSection" }],
});

export default mongoose.model<ICourseBridge>(
    "CourseBridge",
    CourseBridgeSchema
);
