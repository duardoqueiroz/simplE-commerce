import { HttpResponse } from "../../application/contracts/http/http-response";
import AuthenticationFailedError from "../../application/errors/application/authentication-failed-error";
import DefaultApplicationError from "../../application/errors/application/default-application-error";
import InvalidFieldsError from "../../application/errors/application/invalid-fields-error";
import ItemNotFoundError from "../../application/errors/application/item-not-found-error";
import UserNotFoundError from "../../application/errors/application/user-not-found-error";
import DefaultDomainError from "../../application/errors/domain/default-domain.error";
import ValidationError from "../../application/errors/domain/validation-error";
import BadRequestResponse from "../../infra/responses/bad-request-response";
import InternalServerErrorResponse from "../../infra/responses/internal-server-error-response";
import NotFoundResponse from "../../infra/responses/not-found-response";

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
