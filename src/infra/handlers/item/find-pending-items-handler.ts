import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindPendingItemsUseCase from "../../../domain/use-cases/item/find-pending-items-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class FindPendingItemsHandler implements HttpHandler {
	constructor(
		private readonly findPendingItemsUseCase: IFindPendingItemsUseCase
	) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const findPendingItemsResponse =
			await this.findPendingItemsUseCase.execute();
		if (findPendingItemsResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(
				findPendingItemsResponse.value
			);
		}
		return new SuccessResponse(findPendingItemsResponse.value);
	}
}
