import InvalidItemNameError from "../../../application/errors/domain/invalid-item-name-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class Name {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidItemNameError, Name> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Item name is required");
		} else {
			if (value.length < 3) {
				errorMessages.push("Item name must be at least 3 characters long");
			}
			if (value.length > 70) {
				errorMessages.push("Item name must be at most 70 characters long");
			}
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemNameError(`Invalid name: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Name(value));
	}

	public static buildExisting(value: string): Name {
		return new Name(value);
	}

	public get value(): string {
		return this._value;
	}
}
