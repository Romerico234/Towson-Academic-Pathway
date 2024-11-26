export interface IAuthService {
    /**
     * Registers a new user
     * @param email User's email address
     * @param password User's password
     * @param firstName User's first name
     * @param lastName User's last name
     * @returns A Promise that resolves to an object containing the JWT token
     */
    register(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ): Promise<{ token: string }>;

    /**
     * Authenticates a user
     * @param email User's email address
     * @param password User's password
     * @returns A Promise that resolves to an object containing the JWT token
     */
    login(email: string, password: string): Promise<{ token: string }>;
}
