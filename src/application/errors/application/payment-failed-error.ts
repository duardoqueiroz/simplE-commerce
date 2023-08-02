import DefaultApplicationError from "./default-application-error";

export default class PaymentFailedError extends DefaultApplicationError {
	constructor(
		message: string,
		readonly transactionId: string,
		readonly typeError: string
	) {
		super(message);
		this.name = "PaymentFailedError";
	}
}
