import api from "./api-service";

export default class CourseSectionService {
    async getAllCourseSections(): Promise<any> {
        const response = await api.get("/course-sections");
        return response.data;
    }

    async getCourseSectionById(courseSectionId: string): Promise<any> {
        const response = await api.get(`/course-sections/${courseSectionId}`);
        return response.data;
    }

    async getCourseSectionsByCourseBridgeId(
        courseBridgeId: string
    ): Promise<any> {
        const response = await api.get(
            `/course-sections/bridge/${courseBridgeId}`
        );
        return response.data;
    }
}
