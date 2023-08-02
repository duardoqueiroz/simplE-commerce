import DefaultApplicationError from "./default-application-error";

export default class OrderNotFoundError extends DefaultApplicationError {
	public messages: string[] = [];

	constructor() {
		super("Order not found");
		this.name = "OrderNotFoundError";
		this.messages.push("Order not found");
	}
}
