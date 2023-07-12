import DefaultError from "./default-error";

export default class ValidationError extends DefaultError {
	constructor(message?: string, readonly field?: string) {
		super(message);
		this.name = "ValidationError";
	}
}
