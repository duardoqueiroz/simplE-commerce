import DefaultError from "./default-error";

export default class AuthenticationFailedError extends DefaultError {
	public messages: string[] = [];

	constructor() {
		super("Authentication Failed");
		this.name = "AuthenticationFailedError";
		this.messages.push("Email or password is incorrect");
	}
}
