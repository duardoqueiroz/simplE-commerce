import ValidationError from "./validation-error";

export default class InvalidItemDescriptionError extends ValidationError {
	public name: string = "InvalidItemDescriptionError";

	constructor(message?: string) {
		super(message, "item-description");
	}
}
