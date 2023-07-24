import ValidationError from "./validation-error";

export default class InvalidCardError extends ValidationError {
	public name: string = "InvalidCardError";

	constructor(message?: string) {
		super(message, "card");
	}
}
