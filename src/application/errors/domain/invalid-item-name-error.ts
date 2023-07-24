import ValidationError from "./validation-error";

export default class InvalidItemNameError extends ValidationError {
	public name: string = "InvalidItemNameError";

	constructor(message?: string) {
		super(message, "item-name");
	}
}
