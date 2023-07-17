import DefaultApplicationError from "./default-application-error";

export default class EmailAlreadyInUseError extends DefaultApplicationError {
	constructor() {
		super("Email already in use");
		this.name = "EmailAlreadyInUseError";
	}
}
