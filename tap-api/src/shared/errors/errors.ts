export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}

export class OpenAIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OpenAIError";
    }
}