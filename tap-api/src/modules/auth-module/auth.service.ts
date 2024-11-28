import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../../shared/errors/errors";
import { UserService } from "../user-module/user.service";
import { IAuthService } from "./interfaces/iauth.service";

export class AuthService implements IAuthService {
    private JWT_SECRET: string;
    private userService = new UserService();

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
    }

    public async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ): Promise<{ token: string }> {
        // Check if user already exists
        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new AuthError("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await this.userService.createUser({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            academicInfo: {},
            preferences: {},
            degreePlan: {},
            favorites: [],
        });

        // Generate JWT token
        const token = this.generateToken(newUser._id.toHexString(), email);

        return { token };
    }

    public async login(
        email: string,
        password: string
    ): Promise<{ token: string }> {
        const user = await this.userService.getUserProfile(email);
        if (!user) {
            throw new AuthError("Invalid credentials");
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Invalid credentials");
        }

        // Generate JWT token
        const token = this.generateToken(user._id.toHexString(), email);

        return { token };
    }

    private generateToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });
    }
}
