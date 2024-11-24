// NOTE: In the back burner
// import CourseSection, {
//     ICourseSection,
// } from "../types/models/course-section.schema";
// import { Types } from "mongoose";

// export class CourseSectionService {
//     public async getAllCourseSections(): Promise<ICourseSection[]> {
//         return CourseSection.find().exec();
//     }

//     public async getCourseSectionById(
//         courseSectionId: string
//     ): Promise<ICourseSection | null> {
//         return CourseSection.findById(courseSectionId).exec();
//     }

//     public async getCourseSectionsByCourseBridgeId(
//         courseBridgeId: string
//     ): Promise<ICourseSection[]> {
//         return CourseSection.find({
//             courseBridgeId: new Types.ObjectId(courseBridgeId),
//         }).exec();
//     }
// }
