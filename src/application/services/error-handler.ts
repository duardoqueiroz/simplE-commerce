import DefaultDomainError from "../../domain/errors/default-domain-error";
import ValidationError from "../../domain/errors/validation-error";
import BadRequestResponse from "../../infra/api/responses/bad-request-response";
import InternalServerErrorResponse from "../../infra/api/responses/internal-server-error-response";
import AuthenticationFailedError from "../error/authentication-failed-error";
import DefaultApplicationError from "../error/default-application-error";
import InvalidFieldsError from "../error/invalid-fields-error";
import { HttpResponse } from "../ports/http-responses/http-response";

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
