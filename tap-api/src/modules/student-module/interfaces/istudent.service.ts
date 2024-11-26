import {
    IStudentData,
    FavoriteSchedule,
} from "../../../shared/types/models/student.schema";
import { Types } from "mongoose";

export interface IStudentService {
    /**
     * Creates new student data
     * @param userId - The ObjectId of the user
     * @param email - The email of the student
     * @param firstName - The first name of the student
     * @param lastName - The last name of the student
     * @returns A Promise that resolves to the created IStudentData
     */
    createStudentData(
        userId: Types.ObjectId,
        email: string,
        firstName: string,
        lastName: string
    ): Promise<IStudentData>;

    /**
     * Retrieves student data by email
     * @param email - The email of the student
     * @returns A Promise that resolves to IStudentData or null if not found
     */
    getStudentByEmail(email: string): Promise<IStudentData | null>;

    /**
     * Updates student data by email
     * @param email - The email of the student
     * @param updates - Partial updates to apply to the student data
     * @returns A Promise that resolves to IStudentData or null if not found
     */
    updateStudentByEmail(
        email: string,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null>;

    /**
     * Retrieves the favorites of a student by email
     * @param email - The email of the student
     * @returns A Promise that resolves to an array of FavoriteSchedule or null if not found
     */
    getFavoritesByEmail(email: string): Promise<FavoriteSchedule[] | null>;

    /**
     * Adds a favorite schedule to a student's favorites by email
     * @param email - The email of the student
     * @param favoriteData - The favorite schedule data to add
     * @returns A Promise that resolves to the added FavoriteSchedule or null if student not found
     */
    addFavoriteByEmail(
        email: string,
        favoriteData: FavoriteSchedule
    ): Promise<FavoriteSchedule | null>;

    /**
     * Removes a favorite schedule from a student's favorites by email
     * @param email - The email of the student
     * @param favoriteName - The name of the favorite schedule to remove
     * @returns A Promise that resolves to true if removed, false otherwise
     */
    removeFavoriteByEmail(
        email: string,
        favoriteName: string
    ): Promise<boolean>;
}
