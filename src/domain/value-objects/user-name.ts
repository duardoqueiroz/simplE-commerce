import { Either, left, right } from "../../helpers/Either";
import ValidationError from "../errors/validation-error";
import InvalidNameError from "../errors/value-object-errors/invalid-name-error";

export default class UserName {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidNameError, UserName> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Name is required");
		}
		if (value.length < 3) {
			errorMessages.push("Name must be at least 3 characters long");
		}
		if (value.split(" ").length < 2) {
			errorMessages.push("Name must have at least 2 words");
		}
		if (errorMessages.length > 0) {
			const error = new InvalidNameError(`Invalid name: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new UserName(value));
	}

	public get value(): string {
		return this._value;
	}
}
