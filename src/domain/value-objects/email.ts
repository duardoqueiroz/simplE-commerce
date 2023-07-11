import { Either, left, right } from "../../helpers/Either";
import InvalidEmailError from "../errors/value-object-errors/invalid-email-error";

export default class Email {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidEmailError, Email> {
		if (
			!value ||
			!String(value)
				.toLowerCase()
				.match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)
		) {
			const error = new InvalidEmailError(`Invalid email: ${value}`);
			error.messages = ["Email is required and must be valid"];
			return left(error);
		}
		return right(new Email(value));
	}

	public get value(): string {
		return this._value;
	}
}
