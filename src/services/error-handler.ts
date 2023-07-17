import { HttpResponse } from "../contracts/http/http-response";
import AuthenticationFailedError from "../presentation/errors/application/authentication-failed-error";
import DefaultApplicationError from "../presentation/errors/application/default-application-error";
import InvalidFieldsError from "../presentation/errors/application/invalid-fields-error";
import ItemNotFoundError from "../presentation/errors/application/item-not-found-error";
import UserNotFoundError from "../presentation/errors/application/user-not-found-error";
import DefaultDomainError from "../presentation/errors/domain/default-domain.error";
import ValidationError from "../presentation/errors/domain/validation-error";
import BadRequestResponse from "../presentation/http-responses/bad-request-response";
import InternalServerErrorResponse from "../presentation/http-responses/internal-server-error-response";
import NotFoundResponse from "../presentation/http-responses/not-found-response";

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
		if (
			error instanceof UserNotFoundError ||
			error instanceof ItemNotFoundError
		) {
			return new NotFoundResponse(error);
		}
		return new InternalServerErrorResponse(error);
	}
}
