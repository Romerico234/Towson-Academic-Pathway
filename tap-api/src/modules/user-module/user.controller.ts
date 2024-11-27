import { Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserProfile = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            // Extract user ID from JWT token
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: "Authorization header missing",
                });
                return;
            }

            const token = authHeader.split(" ")[1];
            const decodedToken: any = jwt.verify(
                token,
                process.env.JWT_SECRET || "jwt_secret_key"
            );

            const userId = new Types.ObjectId(decodedToken.userId);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving user profile",
                error,
            });
        }
    };

    public updateUserProfile = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            // Extract user ID from JWT token
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: "Authorization header missing",
                });
                return;
            }

            const token = authHeader.split(" ")[1];
            const decodedToken: any = jwt.verify(
                token,
                process.env.JWT_SECRET || "jwt_secret_key"
            );

            const userId = new Types.ObjectId(decodedToken.userId);
            const updates = req.body;
            const updatedUser = await this.userService.updateUser(
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
                message: "Error updating user profile",
                error,
            });
        }
    };
}
