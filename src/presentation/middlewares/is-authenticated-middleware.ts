import { objectKeyExists } from "../../helpers/ObjectsHelper";
import HttpMiddleware from "../../contracts/http/http-middleware";
import { HttpResponse } from "../../contracts/http/http-response";
import MiddlewareRequest from "../../contracts/http/middleware-request";
import TokenGenerator from "../../services/token-generator";
import UnauthorizedResponse from "../http-responses/unathorized-error-response";
import IUserRepository from "../../modules/user/repositories/contracts/user-repository";

export default class IsAuthenticatedMiddleware implements HttpMiddleware {
	constructor(
		private readonly jwtToken: TokenGenerator,
		private readonly userRepository: IUserRepository
	) {}

	public async handle(
		request: MiddlewareRequest
	): Promise<HttpResponse<unknown> | undefined> {
		if (
			!objectKeyExists(request, "headers") ||
			!objectKeyExists(request.headers, "authorization")
		) {
			return new UnauthorizedResponse("You must be authenticated");
		}
		const authorization: string = request.headers.authorization;
		let [token] = authorization.split(/\s+/);
		try {
			const { value } = this.jwtToken.verify(token);
			const user = await this.userRepository.findById(value.user_id);
			if (!user) {
				return new UnauthorizedResponse("You must be authenticated");
			}
			request.headers.user_id = value.user_id;
			request.headers.is_admin = user.isAdmin;
		} catch (error: any) {
			return new UnauthorizedResponse(error.message);
		}
	}
}
