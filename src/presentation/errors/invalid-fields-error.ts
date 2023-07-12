import DefaultError from "./default-error";

interface FieldError {
	field?: string;
	name?: string;
	message?: string;
	messages?: string[];
}

export default class InvalidFieldsError extends DefaultError {
	public messages: string[] = [];

	constructor(message: string, readonly field_error: FieldError) {
		super(message);
		this.name = "InvalidFieldsError";
		this.messages = field_error.messages || [];
	}
}
