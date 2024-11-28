import { Request, Response } from "express";

export interface IUserController {
    /**
     * Retrieves a user by ID
     * @param req - Express Request object containing the userId in params
     * @param res - Express Response object used to send the response
     */
    getUserById(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves a user by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     */
    getUserByEmail(req: Request, res: Response): Promise<void>;

    /**
     * Updates a user by ID
     * @param req - Express Request object containing the userId in params and updates in body
     * @param res - Express Response object used to send the response
     */
    updateUserById(req: Request, res: Response): Promise<void>;

    /**
     * Updates a user by email
     * @param req - Express Request object containing the email in params and updates in body
     * @param res - Express Response object used to send the response
     */
    updateUserByEmail(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves degree plans for a user by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     */
    getDegreePlanByEmail(req: Request, res: Response): Promise<void>;

    /**
     * Adds a favorite degree plan for a user
     * @param req - Express Request object containing the email in params and favoriteData in body
     * @param res - Express Response object used to send the response
     */
    addFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Removes a favorite degree plan for a user
     * @param req - Express Request object containing the email and favoriteName in params
     * @param res - Express Response object used to send the response
     */
    removeFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves favorite degree plans for a user by email
     * @param req - Express Request object containing the email in params
     * @param res - Express Response object used to send the response
     */
    getFavoriteDegreePlansByEmail(req: Request, res: Response): Promise<void>;
}
