import { Request, Response } from "express";

export interface ICoreController {
    /**
     * Retrieves all core requirements
     * @param req - Express Request object
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getAllCores(req: Request, res: Response): Promise<void>;

    /**
     * Searches for core requirements based on a query string
     * @param req - Express Request object containing the query parameter
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    searchCores(req: Request, res: Response): Promise<void>;
}
