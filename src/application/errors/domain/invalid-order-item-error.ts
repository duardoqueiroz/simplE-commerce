import ValidationError from "./validation-error";

export default class InvalidOrderItemError extends ValidationError {
	public name: string = "InvalidOrderItemError";

	constructor(message?: string) {
		super(message, "order-item");
	}
}
