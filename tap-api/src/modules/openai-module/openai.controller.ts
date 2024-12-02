import { Request, Response, NextFunction } from "express";
import { OpenAIService } from "./openai.service";
import { OpenAIError } from "../../shared/errors/errors";

export class OpenAIController {
    private openAIService: OpenAIService;

    constructor() {
        this.openAIService = new OpenAIService();
    }

    public generatePlans = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const userData = req.body; 
        const unofficialTranscript = req.file; 

        if (!userData || !unofficialTranscript) {
            res.status(400).json({ message: "User data or file is missing" });
            return;
        }

        try {
            // Call OpenAI service to generate the plan
            const result = await this.openAIService.generatePlans(userData, unofficialTranscript);

            res.json(result);
        } catch (error) {
            if (error instanceof OpenAIError) {
                res.status(500).json({ message: error.message });
            } else {
                console.error("OpenAI Controller error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    };
}
