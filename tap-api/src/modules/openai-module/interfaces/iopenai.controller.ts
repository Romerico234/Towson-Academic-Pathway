import { Request, Response, NextFunction } from "express";

export interface IOpenAIController {
    /**
     * Generates academic plans using OpenAI based on the provided prompt
     * @param req - Express Request object containing the prompt in the body
     * @param res - Express Response object used to send the response
     * @param next - Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    generatePlans(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
