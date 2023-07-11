import DefaultDomainError from "../default-domain-error";
import ValidationError from "../validation-error";

export default class InvalidCpfError extends ValidationError {
	public name: string = "InvalidCpfError";

	constructor(message?: string) {
		super(message, "cpf");
	}
}
