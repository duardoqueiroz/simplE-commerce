import ValidationError from "./validation-error";

export default class InvalidNameError extends ValidationError {
	public name: string = "InvalidNameError";

	constructor(message?: string) {
		super(message, "name");
	}
}
