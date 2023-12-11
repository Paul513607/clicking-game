
export class UserValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}