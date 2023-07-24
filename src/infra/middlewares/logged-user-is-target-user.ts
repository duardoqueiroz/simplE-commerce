import HttpMiddleware from "../../application/contracts/http/http-middleware";
import { HttpResponse } from "../../application/contracts/http/http-response";
import MiddlewareRequest from "../../application/contracts/http/middleware-request";
import { objectKeyExists } from "../../common/helpers/ObjectsHelper";
import UnauthorizedResponse from "../responses/unathorized-error-response";

export default class LoggedUserIsTargetUserMiddleware
	implements HttpMiddleware
{
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
