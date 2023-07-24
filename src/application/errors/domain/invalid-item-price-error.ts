import ValidationError from "./validation-error";

export default class InvalidItemPriceError extends ValidationError {
	public name: string = "InvalidItemPriceError";

	constructor(message?: string) {
		super(message, "item-price");
	}
}
