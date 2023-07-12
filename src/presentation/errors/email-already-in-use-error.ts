import DefaultError from "./default-error";

export default class EmailAlreadyInUseError extends DefaultError {
	constructor() {
		super("Email already in use");
		this.name = "EmailAlreadyInUseError";
	}
}
