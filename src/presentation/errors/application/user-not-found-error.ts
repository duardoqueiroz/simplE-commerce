import DefaultApplicationError from "./default-application-error";

export default class UserNotFoundError extends DefaultApplicationError {
	public messages: string[] = [];

	constructor() {
		super("User not found");
		this.name = "UserNotFoundError";
		this.messages.push("User not found");
	}
}
