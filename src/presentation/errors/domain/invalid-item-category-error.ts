import ValidationError from "./validation-error";

export default class InvalidItemCategoryError extends ValidationError {
	public name: string = "InvalidItemCategoryError";

	constructor(message?: string) {
		super(message, "item-category");
	}
}
