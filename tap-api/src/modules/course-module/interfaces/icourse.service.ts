import { ICourse } from "../../../shared/types/models/course.schema";

export interface ICourseService {
    /**
     * Retrieves all courses
     * @returns A Promise that resolves to an array of ICourse
     */
    getAllCourses(): Promise<ICourse[]>;

    /**
     * Retrieves a course by its ID
     * @param courseId The ID of the course
     * @returns A Promise that resolves to an ICourse or null if not found
     */
    getCourseById(courseId: string): Promise<ICourse | null>;

    /**
     * Searches for courses based on query parameters
     * @param query An object containing query parameters
     * @returns A Promise that resolves to an array of ICourse
     */
    searchCourses(query: any): Promise<ICourse[]>;
}
