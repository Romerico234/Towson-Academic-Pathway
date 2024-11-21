import { Request, Response, NextFunction } from "express";
import { CourseSectionService } from "../services/course-section.service";

export class CourseSectionController {
    private courseSectionService: CourseSectionService;

    constructor() {
        this.courseSectionService = new CourseSectionService();
    }

    public getAllCourseSections = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseSections =
                await this.courseSectionService.getAllCourseSections();
            res.json(courseSections);
        } catch (error) {
            next(error);
        }
    };

    public getCourseSectionById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseSectionId = req.params.id;
            const courseSection =
                await this.courseSectionService.getCourseSectionById(
                    courseSectionId
                );
            if (!courseSection) {
                res.status(404).json({ message: "Course Section not found" });
            } else {
                res.json(courseSection);
            }
        } catch (error) {
            next(error);
        }
    };

    public getCourseSectionsByCourseBridgeId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseBridgeId = req.params.bridgeId;
            const courseSections =
                await this.courseSectionService.getCourseSectionsByCourseBridgeId(
                    courseBridgeId
                );
            res.json(courseSections);
        } catch (error) {
            next(error);
        }
    };

    public createCourseSection = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseSectionData = req.body;
            const courseSection =
                await this.courseSectionService.createCourseSection(
                    courseSectionData
                );
            res.status(201).json(courseSection);
        } catch (error) {
            next(error);
        }
    };

    public updateCourseSection = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseSectionId = req.params.id;
            const courseSectionData = req.body;
            const courseSection =
                await this.courseSectionService.updateCourseSection(
                    courseSectionId,
                    courseSectionData
                );
            if (!courseSection) {
                res.status(404).json({ message: "Course Section not found" });
            } else {
                res.json(courseSection);
            }
        } catch (error) {
            next(error);
        }
    };

    public deleteCourseSection = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const courseSectionId = req.params.id;
            const courseSection =
                await this.courseSectionService.deleteCourseSection(
                    courseSectionId
                );
            if (!courseSection) {
                res.status(404).json({ message: "Course Section not found" });
            } else {
                res.json({ message: "Course Section deleted" });
            }
        } catch (error) {
            next(error);
        }
    };
}
