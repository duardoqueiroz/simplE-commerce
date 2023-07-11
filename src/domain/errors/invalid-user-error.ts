import DefaultDomainError from "./default-domain-error";

export default class InvalidUserError extends DefaultDomainError {
	public name = "InvalidUserError";

	constructor(message?: string) {
		super(message);
		this.message = message || this.name;
		this.messages.push(this.message);
	}
}
