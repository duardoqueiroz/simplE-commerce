import DefaultApplicationError from "./default-application-error";

export default class AuthenticationFailedError extends DefaultApplicationError {
	public messages: string[] = [];

	constructor() {
		super("Authentication Failed");
		this.name = "AuthenticationFailedError";
		this.messages.push("Email or password is incorrect");
	}
}
