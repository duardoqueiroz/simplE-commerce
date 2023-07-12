import DefaultError from "./default-error";

export default class UserNotFoundError extends DefaultError {
	public messages: string[] = [];

	constructor() {
		super("User not found");
		this.name = "UserNotFoundError";
		this.messages.push("User not found");
	}
}
