import ValidationError from "../validation-error";

export default class InvalidPasswordError extends ValidationError {
	public name: string = "InvalidPasswordError";

	constructor(message?: string) {
		super(message, "name");
	}
}
