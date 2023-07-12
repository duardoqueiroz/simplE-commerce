import { Either, left, right } from "../../../helpers/Either";
import InvalidPasswordError from "../../../presentation/errors/invalid-password-error";
import bcrypt from "bcrypt";

export default class Password {
	private static readonly saltRounds = 10;

	private constructor(private readonly hash: string) {}

	public static async create(
		plainText: string
	): Promise<Either<InvalidPasswordError, Password>> {
		let errorMessages: string[] = [];
		if (!plainText) {
			errorMessages.push("Password is required");
		}
		if (
			!plainText.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
			)
		) {
			errorMessages.push(
				"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
			);
		}

		if (errorMessages.length > 0) {
			const error = new InvalidPasswordError(`Invalid password`);
			error.messages = errorMessages;
			return left(error);
		}

		const hash = await this.hashPassword(plainText);

		return right(new Password(hash));
	}

	public async compare(plainText: string): Promise<boolean> {
		return bcrypt.compare(plainText, this.hash);
	}

	public static async hashPassword(plainText: string): Promise<string> {
		return bcrypt.hash(plainText, this.saltRounds);
	}

	public get value(): string {
		return this.hash;
	}
}
