import HttpMiddleware from "../../application/contracts/http/http-middleware";
import { HttpResponse } from "../../application/contracts/http/http-response";
import MiddlewareRequest from "../../application/contracts/http/middleware-request";
import { objectKeyExists } from "../../common/helpers/ObjectsHelper";
import TokenGenerator from "../../common/services/token-generator";
import IUserRepository from "../../domain/repositories/user-repository";
import UnauthorizedResponse from "../responses/unathorized-error-response";

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
