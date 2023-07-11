import DefaultApplicationError from "./default-application-error";

export default class AuthenticationFailedError extends DefaultApplicationError {
	public messages: string[] = [];

	constructor(message: string) {
		super(message);
		this.name = "AuthenticationFailedError";
		this.messages.push("Email or password is incorrect");
	}
}
