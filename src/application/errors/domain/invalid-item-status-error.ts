import ValidationError from "./validation-error";

export default class InvalidItemStatusError extends ValidationError {
	public name: string = "InvalidItemStatusError";

	constructor(message?: string) {
		super(message, "item-status");
	}
}
