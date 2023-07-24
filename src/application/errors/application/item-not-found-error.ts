import DefaultApplicationError from "./default-application-error";

export default class ItemNotFoundError extends DefaultApplicationError {
	public messages: string[] = [];

	constructor() {
		super("Item not found");
		this.name = "ItemNotFoundError";
		this.messages.push("Item not found");
	}
}
