import { isCPF } from "brazilian-values";
import { Either, left, right } from "../../helpers/Either";
import InvalidCpfError from "../errors/value-object-errors/invalid-cpf-error";

export default class Cpf {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Either<InvalidCpfError, Cpf> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("CPF is required");
		}
		if (!isCPF(value)) {
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

	get value(): string {
		return this._value;
	}
}
