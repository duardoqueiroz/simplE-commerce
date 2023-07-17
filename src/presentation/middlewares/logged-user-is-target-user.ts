import HttpMiddleware from "../../contracts/http/http-middleware";
import { HttpResponse } from "../../contracts/http/http-response";
import MiddlewareRequest from "../../contracts/http/middleware-request";
import { objectKeyExists } from "../../helpers/ObjectsHelper";
import IUserRepository from "../../modules/user/repositories/contracts/user-repository";
import UnauthorizedResponse from "../http-responses/unathorized-error-response";

export class LoggedUserIsTargetUserMiddleware implements HttpMiddleware {
	constructor() {}

	public async handle(
		request: MiddlewareRequest
	): Promise<HttpResponse<unknown> | undefined> {
		if (
			!objectKeyExists(request, "headers") ||
			!objectKeyExists(request.headers, "authorization") ||
			!objectKeyExists(request.headers, "user_id")
		) {
			return new UnauthorizedResponse("You must be authenticated");
		}

		const loggedUserId = `${request.headers.user_id}`;

		if (!request.params || !request.params.id) {
			return new UnauthorizedResponse("Unauthorized to access this resource");
		}

		const targetUserId = `${request.params.id}`;

		if (loggedUserId !== targetUserId && !request.headers.is_admin) {
			return new UnauthorizedResponse(
				"You are not allowed to manipulate target user"
			);
		}
	}
}
