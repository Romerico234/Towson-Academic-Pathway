import { Request, Response } from "express";

export interface IRequirementsController {
    /**
     * Retrieves general degree requirements
     */
    getDegreeRequirements(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves honors requirements
     */
    getHonorsRequirements(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves specific degree requirements by type
     * @param req - The request object containing the degree type in params
     */
    getDegreeRequirementByType(req: Request, res: Response): Promise<void>;
}
