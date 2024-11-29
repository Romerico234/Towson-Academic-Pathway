import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "../../shared/types/models/token.schema";
import { ITokenService } from "./interfaces/itoken.service";
import { Types } from "mongoose";
import { AuthError } from "../../shared/errors/errors";

export class TokenService implements ITokenService {
    private JWT_SECRET: string;
    private JWT_REFRESH_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
        this.JWT_REFRESH_SECRET =
            process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret_key";
    }

    public async revokeTokensForUser(userId: Types.ObjectId) {
        await Token.updateMany(
            { userId, isRevoked: false },
            { isRevoked: true }
        );
    }

    public generateAccessToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.JWT_SECRET, {
            expiresIn: "1h", // Short-lived access token
        });
    }

    public generateRefreshToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.JWT_REFRESH_SECRET, {
            expiresIn: "7d", // Long-lived refresh token
        });
    }

    public async storeToken(
        userId: Types.ObjectId,
        token: string,
        type: "access" | "refresh"
    ) {
        const decoded = jwt.decode(token) as { exp: number };

        await Token.create({
            userId,
            token,
            type,
            expiresAt: new Date(decoded.exp * 1000),
            isRevoked: false,
        });
    }

    public async refreshTokens(refreshToken: string) {
        try {
            const decoded = jwt.verify(
                refreshToken,
                this.JWT_REFRESH_SECRET
            ) as { userId: string; email: string };

            const existingToken = await Token.findOne({
                token: refreshToken,
                isRevoked: false,
            });

            if (!existingToken) {
                throw new AuthError("Invalid or revoked refresh token");
            }

            const newAccessToken = this.generateAccessToken(
                decoded.userId,
                decoded.email
            );
            const newRefreshToken = this.generateRefreshToken(
                decoded.userId,
                decoded.email
            );

            // Revoke old tokens
            await this.revokeTokensForUser(new Types.ObjectId(decoded.userId));

            // Store new tokens
            await this.storeToken(
                new Types.ObjectId(decoded.userId),
                newAccessToken,
                "access"
            );
            await this.storeToken(
                new Types.ObjectId(decoded.userId),
                newRefreshToken,
                "refresh"
            );

            return { token: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new AuthError("Invalid refresh token");
        }
    }

    public async logout(token: string) {
        await Token.updateOne({ token, isRevoked: false }, { isRevoked: true });
    }

    public async getUserIdFromToken(token: string): Promise<string> {
        try {
            // Query the Token database collection using the token
            const tokenDoc = await Token.findOne({ token, isRevoked: false });

            if (!tokenDoc) {
                console.error("No token found or token is revoked.");
                throw new AuthError("Invalid or revoked token");
            }

            return tokenDoc.userId.toString();
        } catch (error) {
            console.error("Error fetching userId from token:", error);
            throw new AuthError("Error fetching userId from token");
        }
    }

    public async revokeTokens(tokens: string[]): Promise<void> {
        const tokenRecords = await Token.find({
            token: { $in: tokens },
            isRevoked: false,
        });
        if (!tokenRecords || tokenRecords.length === 0) {
            throw new AuthError("Invalid or already revoked tokens.");
        }

        for (const tokenRecord of tokenRecords) {
            tokenRecord.isRevoked = true;
            await tokenRecord.save();
        }
    }
}
