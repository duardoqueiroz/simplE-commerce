import { ITEM_CATEGORY } from "../../../@types/enums/ITEM_CATEGORY";
import InvalidItemCategoryError from "../../../application/errors/domain/invalid-item-category-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class Category {
	private constructor(private readonly _value: string) {}

	public static create(
		value: string
	): Either<InvalidItemCategoryError, Category> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Item category is required");
		} else {
			value = value.toUpperCase();
			if (!Object.values(ITEM_CATEGORY).includes(value as ITEM_CATEGORY)) {
				errorMessages.push(
					"Item category does not match any of the allowed values"
				);
			}
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemCategoryError(`Invalid category: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Category(value));
	}

	public static buildExisting(value: string): Category {
		return new Category(value);
	}

	public get value(): string {
		return this._value;
	}
}
