import ValidationError from "../validation-error";

export default class InvalidEmailError extends ValidationError {
	public name: string = "InvalidEmailError";

	constructor(message?: string) {
		super(message, "email");
	}
}
