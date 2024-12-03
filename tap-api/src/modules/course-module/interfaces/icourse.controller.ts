import { Request, Response, NextFunction } from "express";

export interface ICourseController {
    /**
     * Retrieves all courses
     * @param req Express Request object
     * @param res Express Response object used to send the response
     * @param next Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    getAllCourses(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    /**
     * Retrieves a course by its ID
     * @param req Express Request object containing courseId in params
     * @param res Express Response object used to send the response
     * @param next Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    getCourseById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    /**
     * Retrieves a course by its subject and catalog number
     * @param req Express Request object containing subject and catalogNumber in params
     * @param res Express Response object used to send the response
     * @param next Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    getCourseBySubjectAndCatalogNumber(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
