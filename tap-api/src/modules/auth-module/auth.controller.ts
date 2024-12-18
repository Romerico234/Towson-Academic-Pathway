import { Request, Response, NextFunction } from "express";
import { IAuthController } from "./interfaces/iauth.controller";
import { AuthService } from "./auth.service";
import { AuthError } from "../../shared/errors/errors";

export class AuthController implements IAuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password, firstName, lastName } = req.body;
            const result = await this.authService.register(
                email,
                password,
                firstName,
                lastName
            );
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error("Registration error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    };

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error("Login error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    };

    public logout = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { token, refreshToken } = req.body;

            if (!token || !refreshToken) {
                res.status(400).json({
                    message:
                        "Both token and refreshToken are required for logout.",
                });
                return;
            }

            await this.authService.logout(token, refreshToken);

            res.status(200).json({ message: "Logout successful." });
        } catch (error) {
            console.error("Logout error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
