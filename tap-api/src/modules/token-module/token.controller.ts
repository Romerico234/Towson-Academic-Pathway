import { Request, Response, NextFunction } from "express";
import { ITokenController } from "./interfaces/itoken.controller";
import { TokenService } from "./token.service";
import { AuthError } from "../../shared/errors/errors";

export class TokenController implements ITokenController {
    private tokenService: TokenService;

    constructor() {
        this.tokenService = new TokenService();
    }

    public refresh = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { refreshToken } = req.body;
            const result = await this.tokenService.refreshTokens(refreshToken);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error("Token refresh error:", error);
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
            const { token } = req.body;
            await this.tokenService.logout(token);
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error("Logout error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    };

    public getUserIdFromToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { token } = req.body;
            const userId = await this.tokenService.getUserIdFromToken(token);
            if (userId) {
                res.status(200).json({ userId });
            } else {
                res.status(400).json({ message: "Invalid token" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
