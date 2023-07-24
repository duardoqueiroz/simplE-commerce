import ValidationError from "./validation-error";

export default class InvalidOrderTotalPriceError extends ValidationError {
	public name: string = "InvalidOrderTotalPriceError";

	constructor(message?: string) {
		super(message, "order-total-price");
	}
}
