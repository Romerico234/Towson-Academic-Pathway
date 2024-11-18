import { Db } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../errors/errors";
import { getDb } from "../utils/db";
import { StudentData } from "../models/student.model";

export class AuthService {
    private db: Db;
    private JWT_SECRET: string;
    private readonly COLLECTION_NAME = "auth";
    private readonly STUDENT_COLLECTION_NAME = "student-data";

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
        // Check if user already exists
        const existingUser = await this.db
            .collection(this.COLLECTION_NAME)
            .findOne({ email });
        if (existingUser) {
            throw new AuthError("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the auth collection
        const newUser = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            createdAt: new Date(),
        };

        const result = await this.db
            .collection(this.COLLECTION_NAME)
            .insertOne(newUser);

        // Create the student data
        const studentData: StudentData = {
            firstName,
            lastName,
            studentId: null,
            academicInfo: {},
            preferences: {},
            degreePlan: [],
            activeSemesterPlan: null,
            createdAt: new Date(),
        };

        // Insert partially into student-data collection
        await this.db
            .collection(this.STUDENT_COLLECTION_NAME)
            .insertOne(studentData);

        // Generate JWT token
        const token = this.generateToken(
            result.insertedId.toHexString(),
            email
        );

        return { token };
    }

    public async login(email: string, password: string) {
        // Find the user in the auth collection
        const user = await this.db
            .collection(this.COLLECTION_NAME)
            .findOne({ email });
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
            // TODO: We want the JWT token to expire after 30 minutes
            // and logs the user out after 3 minutes of inactivity
            // and refreshes the token automatically as long as the user remains active.
            expiresIn: "1hr", // Token expires in 30 minutes
        });
    }
}
