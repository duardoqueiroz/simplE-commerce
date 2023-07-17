import HttpMiddleware from "../../contracts/http/http-middleware";
import { HttpResponse } from "../../contracts/http/http-response";
import MiddlewareRequest from "../../contracts/http/middleware-request";
import { objectKeyExists } from "../../helpers/ObjectsHelper";
import IUserRepository from "../../modules/user/repositories/contracts/user-repository";
import TokenGenerator from "../../services/token-generator";
import UnauthorizedResponse from "../http-responses/unathorized-error-response";

export default class IsAdminMiddleware implements HttpMiddleware {
	constructor(private readonly userRepository: IUserRepository) {}

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
		if (request.headers.is_admin) {
			return;
		}

		const loggedUserId = `${request.headers.user_id}`;

		try {
			const user = await this.userRepository.findById(loggedUserId);
			if (!user) {
				return new UnauthorizedResponse("You must be authenticated");
			}
			if (!user.isAdmin) {
				return new UnauthorizedResponse("You must be an admin");
			}
			request.headers.is_admin = user.isAdmin;
		} catch (error: any) {
			return new UnauthorizedResponse(error.message);
		}
	}
}
