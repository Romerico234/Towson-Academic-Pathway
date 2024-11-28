import { Request, Response } from "express";

export interface IRequirementsController {
    /**
     * Retrieves the academic requirements
     * @param req - Express Request object
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getRequirements(req: Request, res: Response): Promise<void>;
}
