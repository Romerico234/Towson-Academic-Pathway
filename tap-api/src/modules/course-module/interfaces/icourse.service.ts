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
     * Retrieves a course by its subject and catalog number
     * @param subject The subject code of the course
     * @param catalogNumber The catalog number of the course
     * @returns A Promise that resolves to an ICourse or null if not found
     */
    getCourseBySubjectAndCatalogNumber(
        subject: string,
        catalogNumber: string
    ): Promise<ICourse | null>;
}
