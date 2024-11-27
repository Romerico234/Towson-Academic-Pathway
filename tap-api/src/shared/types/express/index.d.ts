import { IUser } from "./shared/types/models/user.schema";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
            };
        }
    }
}

export {};
