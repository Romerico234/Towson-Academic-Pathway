import api from "./api-service";

export default class CourseService {
    async getAllCourses(): Promise<any> {
        const response = await api.get("/courses");
        return response.data;
    }

    async getCourseById(courseId: string): Promise<any> {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    }

    async searchCourses(query: any): Promise<any> {
        const response = await api.get("/courses/search", { params: query });
        return response.data;
    }
}
