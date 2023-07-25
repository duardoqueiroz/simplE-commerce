import { ITEM_STATUS } from "../../@types/enums/ITEM_STATUS";
import HttpMiddleware from "../../application/contracts/http/http-middleware";
import { HttpResponse } from "../../application/contracts/http/http-response";
import MiddlewareRequest from "../../application/contracts/http/middleware-request";
import { objectKeyExists } from "../../common/helpers/ObjectsHelper";
import TokenGenerator from "../../common/services/token-generator";
import IItemRepository from "../../domain/repositories/item-repository";
import IUserRepository from "../../domain/repositories/user-repository";
import BadRequestResponse from "../responses/bad-request-response";
import NotFoundResponse from "../responses/not-found-response";
import UnauthorizedResponse from "../responses/unathorized-error-response";

export default class IsActiveItemOrUserIsItemOwnerMiddleware
	implements HttpMiddleware
{
	constructor(
		private readonly itemRepository: IItemRepository,
		private readonly userRepository: IUserRepository,
		private readonly jwtToken: TokenGenerator
	) {}

	public async handle(
		request: MiddlewareRequest
	): Promise<HttpResponse<unknown> | undefined> {
		if (!request.params || !request.params.id) {
			return new BadRequestResponse("Params with item id is required");
		}

		const targetItemId = `${request.params.id}`;
		const targetItem = await this.itemRepository.findById(targetItemId);
		if (!targetItem) {
			return new NotFoundResponse("Item not found");
		}

		if (targetItem.status === ITEM_STATUS.ACTIVE) {
			return;
		}

		if (
			!objectKeyExists(request, "headers") ||
			!objectKeyExists(request.headers, "authorization")
		) {
			return new UnauthorizedResponse("Unauthorized to perform this action");
		}

		const authorization: string = request.headers.authorization;
		let [token] = authorization.split(/\s+/);
		try {
			const { value } = this.jwtToken.verify(token);
			const user = await this.userRepository.findById(value.user_id);
			if (!user) {
				return new UnauthorizedResponse("Unauthorized to perform this action");
			}
			if (user.id !== targetItem.userId && !user.isAdmin) {
				return new UnauthorizedResponse("Unauthorized to perform this action");
			}
			request.headers.user_id = value.user_id;
			request.headers.is_admin = user.isAdmin;
		} catch (error: any) {
			return new UnauthorizedResponse(error.message);
		}
	}
}
