import { Request, Response, NextFunction } from "express";
import { IOpenAIController } from "./interfaces/iopenai.controller";
import { OpenAIService } from "./openai.service";
import { OpenAIError } from "../../shared/errors/errors";

export class OpenAIController implements IOpenAIController {
    private openAIService: OpenAIService;

    constructor() {
        this.openAIService = new OpenAIService();
    }

    public generatePlans = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({ message: "The prompt is empty" });
            return;
        }

        try {
            const result = await this.openAIService.generatePlans(prompt);
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
