import api from "./api.service";

export default class CourseService {
    async getAllCourses(): Promise<any> {
        const response = await api.get("/courses");
        return response.data;
    }

    async getCourseById(courseId: string): Promise<any> {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    }

    async getCourseBySubjectAndCatalogNumber(
        subject: string,
        catalogNumber: string
    ): Promise<any> {
        const response = await api.get(
            `/courses/${encodeURIComponent(subject)}/${encodeURIComponent(
                catalogNumber
            )}`
        );
        return response.data;
    }
}
