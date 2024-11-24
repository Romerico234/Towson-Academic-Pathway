import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";

export class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    public getAllCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courses = await this.courseService.getAllCourses();
            res.json(courses);
        } catch (error) {
            next(error);
        }
    };

    public getCourseById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseId = req.params.id;
            const course = await this.courseService.getCourseById(courseId);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
            } else {
                res.json(course);
            }
        } catch (error) {
            next(error);
        }
    };

    public searchCourses = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = req.query;
            const courses = await this.courseService.searchCourses(query);
            res.json(courses);
        } catch (error) {
            next(error);
        }
    };
}
