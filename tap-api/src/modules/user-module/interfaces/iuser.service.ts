import { Types } from "mongoose";
import {
    IUser,
    SemesterPlan,
    FavoriteSchedule,
} from "../../../shared/types/models/user.schema";

export interface IUserService {
    /**
     * For authentication, creates a new user
     * @param userData - The data for the new user
     * @returns A Promise that resolves to the created IUser
     */
    createUser(userData: Partial<IUser>): Promise<IUser>;

    /**
     * For authentication, retrieves a user profile by email
     * @param email - The email of the user
     * @returns A Promise that resolves to the IUser or null if not found
     */

    /**
     * Retrieves a user by ID
     * @param userId - The ID of the user
     * @returns A Promise that resolves to the IUser or null if not found
     */
    getUserById(userId: Types.ObjectId): Promise<IUser | null>;

    /**
     * Updates a user by ID
     * @param userId - The ID of the user
     * @param updates - An object containing the updates to apply
     * @returns A Promise that resolves to the updated IUser or null if not found
     */
    updateUserById(
        userId: Types.ObjectId,
        updates: Partial<IUser>
    ): Promise<IUser | null>;

    /**
     * Retrieves all degree plans for a user by ID
     * @param userId - The ID of the user
     * @returns A Promise that resolves to an array of SemesterPlan or null if not found
     */
    getDegreePlanById(userId: Types.ObjectId): Promise<SemesterPlan[] | null>;

    /**
     * Adds a favorite degree plan for a user
     * @param userId - The ID of the user
     * @param favoriteData - The favorite degree plan to add
     * @returns A Promise that resolves to true if added successfully, false otherwise
     */
    addFavoriteDegreePlan(
        userId: Types.ObjectId,
        favoriteData: FavoriteSchedule
    ): Promise<boolean>;

    /**
     * Removes a favorite degree plan for a user
     * @param userId - The ID of the user
     * @param favoriteName - The name of the favorite degree plan to remove
     * @returns A Promise that resolves to true if removed successfully, false otherwise
     */
    removeFavoriteDegreePlan(
        userId: Types.ObjectId,
        favoriteName: string
    ): Promise<boolean>;

    /**
     * Retrieves all favorite degree plans for a user by ID
     * @param userId - The ID of the user
     * @returns A Promise that resolves to an array of FavoriteSchedule or null if not found
     */
    getFavoriteDegreePlansById(
        userId: Types.ObjectId
    ): Promise<FavoriteSchedule[] | null>;
}
