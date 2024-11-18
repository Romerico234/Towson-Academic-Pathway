// /services/auth.service.ts
import { Db } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../errors/errors";
import { getDb } from "../utils/db";

export class AuthService {
    private db: Db;
    private JWT_SECRET: string;

    constructor() {
        this.db = getDb();
        this.JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
    }

    public async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) {
        const existingUser = await this.db
            .collection("auth")
            .findOne({ email });
        if (existingUser) {
            throw new AuthError("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            createdAt: new Date(),
        };

        const result = await this.db.collection("auth").insertOne(newUser);
        // In register method
        const token = this.generateToken(
            result.insertedId.toHexString(),
            email
        );

        return { token };
    }

    public async login(email: string, password: string) {
        const user = await this.db.collection("auth").findOne({ email });
        if (!user) {
            throw new AuthError("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Invalid credentials");
        }

        const token = this.generateToken(user._id.toHexString(), email);
        return { token };
    }

    private generateToken(userId: string, email: string): string {
        return jwt.sign({ userId, email }, this.JWT_SECRET, {
            expiresIn: "1h",
        });
    }
}
