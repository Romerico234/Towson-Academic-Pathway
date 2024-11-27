import { Request, Response, NextFunction } from "express";

export interface IAuthController {
    /**
     * Registers a new user and generates a JWT token
     * @param req Express Request object containing email, password, firstName, and lastName in the body
     * @param res Express Response object used to send the response
     * @param next Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    register(req: Request, res: Response, next: NextFunction): Promise<void>;

    /**
     * Authenticates a user and generates a JWT token
     * @param req Express Request object containing email and password in the body
     * @param res Express Response object used to send the response
     * @param next Express NextFunction for error handling
     * @returns A Promise that resolves to void
     */
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
