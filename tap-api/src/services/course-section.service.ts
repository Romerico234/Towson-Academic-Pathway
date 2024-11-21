import CourseSection, {
    ICourseSection,
} from "../types/models/course-section.schema";
import { Types } from "mongoose";

export class CourseSectionService {
    public async getAllCourseSections(): Promise<ICourseSection[]> {
        return CourseSection.find().exec();
    }

    public async getCourseSectionById(
        courseSectionId: string
    ): Promise<ICourseSection | null> {
        return CourseSection.findById(courseSectionId).exec();
    }

    public async getCourseSectionsByCourseBridgeId(
        courseBridgeId: string
    ): Promise<ICourseSection[]> {
        return CourseSection.find({
            courseBridgeId: new Types.ObjectId(courseBridgeId),
        }).exec();
    }

    public async createCourseSection(
        courseSectionData: Partial<ICourseSection>
    ): Promise<ICourseSection> {
        const courseSection = new CourseSection(courseSectionData);
        return courseSection.save();
    }

    public async updateCourseSection(
        courseSectionId: string,
        courseSectionData: Partial<ICourseSection>
    ): Promise<ICourseSection | null> {
        return CourseSection.findByIdAndUpdate(
            courseSectionId,
            courseSectionData,
            { new: true }
        ).exec();
    }

    public async deleteCourseSection(
        courseSectionId: string
    ): Promise<ICourseSection | null> {
        return CourseSection.findByIdAndDelete(courseSectionId).exec();
    }
}
