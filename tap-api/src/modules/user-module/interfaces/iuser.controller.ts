import { Request, Response } from "express";

export interface IUserController {
    /**
     * Retrieves a user by ID
     * @param req - Express Request object containing the userId in params
     * @param res - Express Response object used to send the response
     */
    getUserById(req: Request, res: Response): Promise<void>;

    /**
     * Updates a user by ID
     * @param req - Express Request object containing the userId in params and updates in body
     * @param res - Express Response object used to send the response
     */
    updateUserById(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves degree plans for a user by ID
     * @param req - Express Request object containing the userId in params
     * @param res - Express Response object used to send the response
     */
    getDegreePlanById(req: Request, res: Response): Promise<void>;

    /**
     * Adds a favorite degree plan for a user
     * @param req - Express Request object containing the userId in params and favoriteData in body
     * @param res - Express Response object used to send the response
     */
    addFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Removes a favorite degree plan for a user
     * @param req - Express Request object containing the userId and favoriteName in params
     * @param res - Express Response object used to send the response
     */
    removeFavoriteDegreePlan(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves favorite degree plans for a user by ID
     * @param req - Express Request object containing the userId in params
     * @param res - Express Response object used to send the response
     */
    getFavoriteDegreePlansById(req: Request, res: Response): Promise<void>;
}
