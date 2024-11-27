import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export interface IStudentController {
    /**
     * Retrieves student data by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     * @param next - Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    getStudentByEmail(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    /**
     * Updates student data by email
     * @param req - Express Request object containing the email in params and updates in body
     * @param res - Express Response object used to send the response
     * @param next - Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    updateStudentByEmail(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;

    /**
     * Retrieves all degree plans for a student by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getDegreePlanByEmail(req: Request, res: Response): Promise<void>;

    /**
     * Adds a favorite degree plan to a student's favorites by email
     * @param req - Express Request object containing the email in params and favorite data in body
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    addFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Removes a favorite degree plan from a student's favorites by email
     * @param req - Express Request object containing the email and favoriteName in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    removeFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves all favorite degree plans for a student by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getFavoriteDegreePlansByEmail(req: Request, res: Response): Promise<void>;
}
