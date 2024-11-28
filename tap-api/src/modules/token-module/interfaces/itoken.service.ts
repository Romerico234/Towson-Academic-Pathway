import { Types } from "mongoose";

export interface ITokenService {
    /**
     * Revokes all tokens associated with a specific user
     * @param userId - The user ID whose tokens should be revoked
     */
    revokeTokensForUser(userId: Types.ObjectId): Promise<void>;

    /**
     * Stores a new token in the database for a specific user
     * @param userId - The user ID for whom the token is being stored
     * @param token - The token string to be stored
     * @param type - The type of the token (either 'access' or 'refresh')
     */
    storeToken(
        userId: Types.ObjectId,
        token: string,
        type: "access" | "refresh"
    ): Promise<void>;

    /**
     * Generates an access token for a user
     * @param userId - The user ID for whom the access token is being generated
     * @param email - The user's email address for inclusion in the token payload
     * @returns A string representing the generated access token
     */
    generateAccessToken(userId: string, email: string): string;

    /**
     * Generates a refresh token for a user
     * @param userId - The user ID for whom the refresh token is being generated
     * @param email - The user's email address for inclusion in the token payload
     * @returns A string representing the generated refresh token
     */
    generateRefreshToken(userId: string, email: string): string;

    /**
     * Refreshes the access token using a valid refresh token
     * @param refreshToken - The refresh token to be used for generating a new access token
     * @returns An object containing the new access token and refresh token
     */
    refreshTokens(
        refreshToken: string
    ): Promise<{ token: string; refreshToken: string }>;

    /**
     * Logs out a user by revoking their token
     * @param token - The token that should be invalidated (logged out)
     */
    logout(token: string): Promise<void>;

    /**
     * Extracts the user ID from a provided token
     * @param token - The token from which the user ID will be extracted
     * @returns The user ID embedded in the token
     */
    getUserIdFromToken(token: string): Promise<string>;
}
