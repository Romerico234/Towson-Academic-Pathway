import { Request, Response } from "express";
import RequirementsService from "./requirements.service";

class RequirementsController {
    async getRequirements(req: Request, res: Response): Promise<void> {
        try {
            const requirements = await RequirementsService.getRequirements();
            res.status(200).json(requirements);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving requirements",
                error,
            });
        }
    }
}

export default new RequirementsController();
