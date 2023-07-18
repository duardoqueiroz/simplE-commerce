import { Either, left, right } from "../../../helpers/Either";
import { isEmail } from "../../../helpers/ObjectsHelper";
import InvalidEmailError from "../../../presentation/errors/domain/invalid-email-error";

export default class Email {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidEmailError, Email> {
		if (!value || !isEmail(value)) {
			const error = new InvalidEmailError(`Invalid email: ${value}`);
			error.messages = ["Email is required and must be valid"];
			return left(error);
		}
		return right(new Email(value));
	}

	public static buildExisting(value: string): Email {
		return new Email(value);
	}

	public get value(): string {
		return this._value;
	}
}
