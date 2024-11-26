import { Request, Response } from "express";

export interface IMajorController {
    /**
     * Retrieves all majors
     * @param req - Express Request object
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getAllMajors(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves a major by its name
     * @param req - Express Request object containing the major name in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getMajorByName(req: Request, res: Response): Promise<void>;

    /**
     * Searches for majors based on a query string
     * @param req - Express Request object containing the query parameter
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    searchMajors(req: Request, res: Response): Promise<void>;
}
