import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindInactiveItemsUseCase from "../../../domain/use-cases/item/find-inactive-items-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class FindInactiveItemsHandler implements HttpHandler {
	constructor(
		private readonly findInactiveItemsUseCase: IFindInactiveItemsUseCase
	) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const findInactiveItemsResponse =
			await this.findInactiveItemsUseCase.execute();
		if (findInactiveItemsResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(
				findInactiveItemsResponse.value
			);
		}
		return new SuccessResponse(findInactiveItemsResponse.value);
	}
}
