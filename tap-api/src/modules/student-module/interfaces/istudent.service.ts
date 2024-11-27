import {
    IStudentData,
    SemesterPlan,
    FavoriteSchedule,
} from "../../../shared/types/models/student.schema";
import { Types } from "mongoose";

export interface IStudentService {
    /**
     * Creates a new student record
     * @param userId The ID of the user
     * @param email The email of the user
     * @param firstName The first name of the user
     * @param lastName The last name of the user
     * @returns A Promise that resolves to the created IStudentData
     */
    createStudentData(
        userId: Types.ObjectId,
        email: string,
        firstName: string,
        lastName: string
    ): Promise<IStudentData>;

    /**
     * Retrieves a student record by email
     * @param email The email of the student
     * @returns A Promise that resolves to the IStudentData or null if not found
     */
    getStudentByEmail(email: string): Promise<IStudentData | null>;

    /**
     * Updates a student record by email
     * @param email The email of the student
     * @param updates An object containing the updates to apply
     * @returns A Promise that resolves to the updated IStudentData or null if not found
     */
    updateStudentByEmail(
        email: string,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null>;

    /**
     * Retrieves all degree plans for a student by email
     * @param email The email of the student
     * @returns A Promise that resolves to an array of SemesterPlan or null if not found
     */
    getDegreePlanByEmail(email: string): Promise<SemesterPlan[] | null>;

    /**
     * Adds a favorite degree plan for a student
     * @param email The email of the student
     * @param favoriteData The favorite degree plan to add
     * @returns A Promise that resolves to true if added successfully, false otherwise
     */
    addFavoriteDegreePlan(
        email: string,
        favoriteData: FavoriteSchedule
    ): Promise<boolean>;

    /**
     * Removes a favorite degree plan for a student
     * @param email The email of the student
     * @param favoriteName The name of the favorite degree plan to remove
     * @returns A Promise that resolves to true if removed successfully, false otherwise
     */
    removeFavoriteDegreePlan(
        email: string,
        favoriteName: string
    ): Promise<boolean>;

    /**
     * Retrieves all favorite degree plans for a student by email
     * @param email The email of the student
     * @returns A Promise that resolves to an array of FavoriteSchedule or null if not found
     */
    getFavoriteDegreePlansByEmail(
        email: string
    ): Promise<FavoriteSchedule[] | null>;
}
