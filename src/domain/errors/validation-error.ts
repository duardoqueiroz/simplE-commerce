import DefaultDomainError from "./default-domain-error";

export default class ValidationError extends DefaultDomainError {
	constructor(message?: string, readonly field?: string) {
		super(message);
		this.name = "ValidationError";
	}
}
