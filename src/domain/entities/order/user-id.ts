import InvalidUserIdError from "../../../application/errors/domain/invalid-user-id";
import { Either, left, right } from "../../../common/helpers/Either";

export default class UserId {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidUserIdError, UserId> {
		const errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("User id is required");
		}

		if (errorMessages.length > 0) {
			const error = new InvalidUserIdError(`Invalid user id`);
			error.messages = errorMessages;
			return left(error);
		}

		return right(new UserId(value));
	}

	public static buildExisting(value: string): UserId {
		return new UserId(value);
	}

	public get value(): string {
		return this._value;
	}
}
