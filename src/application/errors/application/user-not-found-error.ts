import DefaultApplicationError from "./default-application-error";

export default class UserNotFoundError extends DefaultApplicationError {
	constructor() {
		super("User not found");
		this.name = "UserNotFoundError";
	}
}
