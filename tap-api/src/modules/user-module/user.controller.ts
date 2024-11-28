import { Request, Response } from "express";
import { IUserController } from "./interfaces/iuser.controller";
import { UserService } from "./user.service";
import { Types } from "mongoose";

export class UserController implements IUserController{
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const user = await this.userService.getUserById(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving user by ID",
                error,
            });
        }
    }

    public async updateUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const updates = req.body;

            const updatedUser = await this.userService.updateUserById(
                userId,
                updates
            );

            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({
                message: "Error updating user by ID",
                error,
            });
        }
    }

    public async getDegreePlanById(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const degreePlans = await this.userService.getDegreePlanById(userId);

            if (!degreePlans) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(degreePlans);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving degree plans by ID",
                error,
            });
        }
    }

    public async addFavoriteDegreePlan(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const favoriteData = req.body;

            const success = await this.userService.addFavoriteDegreePlan(
                userId,
                favoriteData
            );

            if (!success) {
                res.status(400).json({
                    message: "Failed to add favorite degree plan",
                });
                return;
            }

            res.status(201).json({
                message: "Degree plan favorited successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error favoriting degree plan",
                error,
            });
        }
    }

    public async removeFavoriteDegreePlan(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const favoriteName = req.params.favoriteName;

            const success = await this.userService.removeFavoriteDegreePlan(
                userId,
                favoriteName
            );

            if (!success) {
                res.status(404).json({
                    message: "Favorite degree plan not found",
                });
                return;
            }

            res.status(200).json({
                message: "Degree plan unfavorited successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error unfavoriting degree plan",
                error,
            });
        }
    }

    public async getFavoriteDegreePlansById(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.params.userId);
            const favorites = await this.userService.getFavoriteDegreePlansById(userId);

            if (!favorites) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving favorite degree plans by ID",
                error,
            });
        }
    }
}
