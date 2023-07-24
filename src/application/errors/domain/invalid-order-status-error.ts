import ValidationError from "./validation-error";

export default class InvalidOrderStatusError extends ValidationError {
	public name: string = "InvalidOrderStatusError";

	constructor(message?: string) {
		super(message, "order-status");
	}
}
