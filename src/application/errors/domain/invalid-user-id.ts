import ValidationError from "./validation-error";

export default class InvalidUserIdError extends ValidationError {
	public name: string = "InvalidUserIdError";

	constructor(message?: string) {
		super(message, "user-id");
	}
}
