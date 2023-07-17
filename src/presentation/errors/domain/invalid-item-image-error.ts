import ValidationError from "./validation-error";

export default class InvalidItemImageError extends ValidationError {
	public name: string = "InvalidItemImageError";

	constructor(message?: string) {
		super(message, "item-image");
	}
}
