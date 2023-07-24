import HttpMiddleware from "../../application/contracts/http/http-middleware";
import { HttpResponse } from "../../application/contracts/http/http-response";
import MiddlewareRequest from "../../application/contracts/http/middleware-request";
import { objectKeyExists } from "../../common/helpers/ObjectsHelper";
import IItemRepository from "../../domain/repositories/item-repository";
import UnauthorizedResponse from "../responses/unathorized-error-response";

export default class LoggedUserIsTargetUserItemMiddleware
	implements HttpMiddleware
{
	constructor(private readonly itemRepository: IItemRepository) {}

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

		const targetItemId = `${request.params.id}`;
		const targetItem = await this.itemRepository.findById(targetItemId);
		if (!targetItem) {
			return new UnauthorizedResponse("Item not found");
		}

		if (loggedUserId !== targetItem.userId && !request.headers.is_admin) {
			return new UnauthorizedResponse(
				"Unauthorized to access this resource. You are not the owner of this item or this item does not exists"
			);
		}
	}
}
