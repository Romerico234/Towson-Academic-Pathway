import { Request, Response } from "express";
import { RequirementsService } from "./requirements.service";

export class RequirementsController {
    private requirementsService: RequirementsService;

    constructor() {
        this.requirementsService = new RequirementsService();
    }

    public getRequirements = async (req: Request, res: Response): Promise<void> => {
        try {
            const requirements = await this.requirementsService.getRequirements();
            res.status(200).json(requirements);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving requirements",
                error,
            });
        }
    };
}
