import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface ICourseBridge extends Document {
    courseId: Types.ObjectId;
    courseSections: Types.ObjectId[];
}

const CourseBridgeSchema = new Schema<ICourseBridge>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        courseSections: [{ type: Schema.Types.ObjectId, ref: "CourseSection" }],
    },
    { collection: COLLECTION_NAMES.COURSE_BRIDGE }
);

export default mongoose.model<ICourseBridge>(
    "CourseBridge",
    CourseBridgeSchema
);
