import { Either, left, right } from "../../helpers/Either";
import DefaultDomainError from "../errors/default-domain-error";
import InvalidUserError from "../errors/invalid-user-error";
import ValidationError from "../errors/validation-error";
import Cpf from "../value-objects/cpf";
import Email from "../value-objects/email";
import Password from "../value-objects/password";
import UserName from "../value-objects/user-name";
import BaseEntity from "./base-entity";

interface UserProps {
	name: UserName;
	email: Email;
	cpf: Cpf;
	password_hash: Password;
}

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
	): Promise<Either<DefaultDomainError, User>> {
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
