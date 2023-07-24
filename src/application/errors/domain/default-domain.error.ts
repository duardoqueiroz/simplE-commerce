export type ErrorParams = {
	name?: string;
	message?: string;
	messages?: string[];
	stack?: Error["stack"];
};

export default class DefaultDomainError extends Error {
	public messages: string[] = [];

	constructor(message?: string) {
		super(message);
		this.name = "DefaultDomainError";
		this.message = message || this.name;
		this.messages.push(this.message);
	}
}
