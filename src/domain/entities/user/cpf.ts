import InvalidCpfError from "../../../application/errors/domain/invalid-cpf-error";
import { Either, left, right } from "../../../common/helpers/Either";
import { isCpf } from "../../../common/helpers/ObjectsHelper";

export default class Cpf {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidCpfError, Cpf> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("CPF is required");
		} else if (!isCpf(value)) {
			errorMessages.push("Invalid CPF");
		}

		if (errorMessages.length > 0) {
			const error = new InvalidCpfError(`Invalid CPF: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		// Remove all non-numeric characters
		value = value.replace(/\D/g, "");
		return right(new Cpf(value));
	}

	public static buildExisting(value: string): Cpf {
		return new Cpf(value);
	}

	get value(): string {
		return this._value;
	}
}
