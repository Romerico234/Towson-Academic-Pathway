import { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/course.service";

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

    public createCourse = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseData = req.body;
            const course = await this.courseService.createCourse(courseData);
            res.status(201).json(course);
        } catch (error) {
            next(error);
        }
    };

    public updateCourse = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseId = req.params.id;
            const courseData = req.body;
            const course = await this.courseService.updateCourse(
                courseId,
                courseData
            );
            if (!course) {
                res.status(404).json({ message: "Course not found" });
            } else {
                res.json(course);
            }
        } catch (error) {
            next(error);
        }
    };

    public deleteCourse = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseId = req.params.id;
            const course = await this.courseService.deleteCourse(courseId);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
            } else {
                res.json({ message: "Course deleted" });
            }
        } catch (error) {
            next(error);
        }
    };
}
