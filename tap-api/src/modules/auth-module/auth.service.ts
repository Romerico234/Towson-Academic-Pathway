import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../../types/errors/errors";
import User, { IUser } from "../../types/models/user.schema";
import StudentData from "../../types/models/student.schema";

export class AuthService {
    private JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
    }

    public async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AuthError("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        const savedUser: IUser = await newUser.save();

        const studentData = new StudentData({
            userId: savedUser._id,
            studentId: null,
            firstName,
            lastName,
            academicInfo: {},
            preferences: {},
            degreePlan: [],
            activeSemesterPlan: null,
        });

        await studentData.save();

        // Generate JWT token
        const token = this.generateToken(savedUser._id.toHexString(), email);

        return { token };
    }

    public async login(email: string, password: string) {
        const user: IUser | null = await User.findOne({ email });
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
            expiresIn: "1h", // Token expires in 1 hour
        });
    }
}
