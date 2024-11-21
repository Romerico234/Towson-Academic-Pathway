import Course, { ICourse } from "../types/models/course.schema";
import { Types } from "mongoose";

export class CourseService {
  public async getAllCourses(): Promise<ICourse[]> {
    return Course.find().exec();
  }

  public async getCourseById(courseId: string): Promise<ICourse | null> {
    return Course.findById(courseId).exec();
  }

  public async searchCourses(query: any): Promise<ICourse[]> {
    // Implement search logic based on query parameters
    return Course.find(query).exec();
  }

  public async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    const course = new Course(courseData);
    return course.save();
  }

  public async updateCourse(courseId: string, courseData: Partial<ICourse>): Promise<ICourse | null> {
    return Course.findByIdAndUpdate(courseId, courseData, { new: true }).exec();
  }

  public async deleteCourse(courseId: string): Promise<ICourse | null> {
    return Course.findByIdAndDelete(courseId).exec();
  }
}
