import { Either, left, right } from "../../../helpers/Either";
import InvalidItemDescriptionError from "../../../presentation/errors/domain/invalid-item-description-error";

export default class Description {
	private constructor(private readonly _value: string) {}

	public static create(
		value: string
	): Either<InvalidItemDescriptionError, Description> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Item description is required");
		} else {
			if (value.length < 10) {
				errorMessages.push(
					"Item description must be at least 10 characters long"
				);
			}
			if (value.length > 300) {
				errorMessages.push(
					"Item description must be at most 300 characters long"
				);
			}
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemDescriptionError(`Invalid description`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Description(value));
	}

	public static buildExisting(value: string): Description {
		return new Description(value);
	}

	public get value(): string {
		return this._value;
	}
}
