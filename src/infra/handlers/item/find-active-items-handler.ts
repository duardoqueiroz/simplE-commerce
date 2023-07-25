import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindActiveItemsUseCase from "../../../domain/use-cases/item/find-active-items-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class FindActiveItemsHandler implements HttpHandler {
	constructor(
		private readonly findActiveItemsUseCase: IFindActiveItemsUseCase
	) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const findActiveItemsResponse = await this.findActiveItemsUseCase.execute();
		if (findActiveItemsResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(
				findActiveItemsResponse.value
			);
		}
		return new SuccessResponse(findActiveItemsResponse.value);
	}
}
