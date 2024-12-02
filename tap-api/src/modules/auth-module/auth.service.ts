import bcrypt from "bcrypt";
import { AuthError } from "../../shared/errors/errors";
import { UserService } from "../user-module/user.service";
import { TokenService } from "../token-module/token.service";
import { IAuthService } from "./interfaces/iauth.service";
import Token from "../../shared/types/models/token.schema";

export class AuthService implements IAuthService {
    private userService = new UserService();
    private tokenService = new TokenService();

    public async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) {
        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new AuthError("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.createUser({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            academicInfo: {},
            preferencesInfo: {},
            degreePlan: [],
            favorites: [],
        });

        const accessToken = this.tokenService.generateAccessToken(
            newUser._id.toHexString(),
            email
        );
        const refreshToken = this.tokenService.generateRefreshToken(
            newUser._id.toHexString(),
            email
        );

        await this.tokenService.storeToken(newUser._id, accessToken, "access");
        await this.tokenService.storeToken(
            newUser._id,
            refreshToken,
            "refresh"
        );

        return { token: accessToken, refreshToken };
    }

    public async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new AuthError("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Invalid credentials");
        }

        // Revoke existing tokens using TokenService
        await this.tokenService.revokeTokensForUser(user._id);

        const accessToken = this.tokenService.generateAccessToken(
            user._id.toHexString(),
            email
        );
        const refreshToken = this.tokenService.generateRefreshToken(
            user._id.toHexString(),
            email
        );

        await this.tokenService.storeToken(user._id, accessToken, "access");
        await this.tokenService.storeToken(user._id, refreshToken, "refresh");

        return { token: accessToken, refreshToken };
    }

    public async logout(token: string, refreshToken: string): Promise<void> {
        await this.tokenService.revokeTokens([token, refreshToken]);
    }
    
    
}
