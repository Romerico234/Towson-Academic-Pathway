import { Request, Response, NextFunction } from "express";

export interface ITokenController {
    /**
     * Refreshes the access token using the provided refresh token
     * @param req - The request object containing the refresh token
     * @param res - The response object to send the new access token
     * @param next - The next middleware function in the request-response cycle
     */
    refresh(req: Request, res: Response, next: NextFunction): Promise<void>;

    /**
     * Logs out the user by revoking their current token
     * @param req - The request object containing the token to be revoked
     * @param res - The response object to acknowledge the logout
     * @param next - The next middleware function in the request-response cycle
     */
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;

    /**
     * Extracts the user ID from the provided token
     * @param req - The request object containing the token
     * @param res - The response object to return the extracted user ID
     * @param next - The next middleware function in the request-response cycle
     */
    getUserIdFromToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}
