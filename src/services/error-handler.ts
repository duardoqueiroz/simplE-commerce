import { HttpResponse } from "../ports/http/http-response";
import AuthenticationFailedError from "../presentation/errors/authentication-failed-error";
import DefaultApplicationError from "../presentation/errors/default-application-error";
import DefaultDomainError from "../presentation/errors/default-domain-error";
import InvalidFieldsError from "../presentation/errors/invalid-fields-error";
import ValidationError from "../presentation/errors/validation-error";
import BadRequestResponse from "../presentation/http-responses/bad-request-response";
import InternalServerErrorResponse from "../presentation/http-responses/internal-server-error-response";

export default class ErrorHandler {
	public static mapDomainErrorToUseCaseError(
		error: DefaultDomainError
	): DefaultApplicationError {
		const { name, message, messages } = error;
		if (error instanceof ValidationError) {
			const { field } = error as ValidationError;
			return new InvalidFieldsError("Invalid Fields", {
				field: field,
				message: message,
				messages: messages,
				name: name,
			});
		}
		return new DefaultApplicationError(message);
	}

	public static mapUseCaseErrorToHttpResponse(
		error: DefaultApplicationError
	): HttpResponse<unknown> {
		if (
			error instanceof InvalidFieldsError ||
			error instanceof AuthenticationFailedError
		) {
			return new BadRequestResponse(error);
		}
		return new InternalServerErrorResponse(error);
	}
}
