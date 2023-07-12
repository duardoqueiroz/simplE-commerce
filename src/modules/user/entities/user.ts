import { Either, left, right } from "../../../helpers/Either";
import DefaultError from "../../../presentation/errors/default-error";
import BaseEntity from "../../base-entity";
import Cpf from "./cpf";
import Email from "./email";
import Password from "./password";
import UserName from "./user-name";

export default class User extends BaseEntity {
	private constructor(
		private readonly _name: UserName,
		private readonly _email: Email,
		private readonly _cpf: Cpf,
		private readonly _password: Password,
		id?: string
	) {
		super(id);
	}

	public static async create(
		name: string,
		email: string,
		cpf: string,
		plainPassword: string,
		id?: string
	): Promise<Either<DefaultError, User>> {
		const nameOrError = UserName.create(name);
		const emailOrError = Email.create(email);
		const cpfOrError = Cpf.create(cpf);
		const passwordOrError = await Password.create(plainPassword);

		if (nameOrError.isLeft()) {
			return left(nameOrError.value);
		}

		if (emailOrError.isLeft()) {
			return left(emailOrError.value);
		}

		if (cpfOrError.isLeft()) {
			return left(cpfOrError.value);
		}

		if (passwordOrError.isLeft()) {
			return left(passwordOrError.value);
		}

		return right(
			new User(
				nameOrError.value as UserName,
				emailOrError.value as Email,
				cpfOrError.value as Cpf,
				passwordOrError.value as Password,
				id
			)
		);
	}

	public get name(): string {
		return this._name.value;
	}

	public get email(): string {
		return this._email.value;
	}

	public get cpf(): string {
		return this._cpf.value;
	}

	public get password(): Password {
		return this._password;
	}
}
