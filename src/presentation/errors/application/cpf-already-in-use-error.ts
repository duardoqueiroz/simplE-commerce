import DefaultApplicationError from "./default-application-error";

export default class CpfAlreadyInUseError extends DefaultApplicationError {
	constructor() {
		super("Cpf already in use");
		this.name = "CpfAlreadyInUseError";
	}
}
