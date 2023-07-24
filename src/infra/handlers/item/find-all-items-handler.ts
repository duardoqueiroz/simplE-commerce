import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindAllItemsUseCase from "../../../domain/use-cases/item/find-all-items-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class FindAllItemsHandler implements HttpHandler {
	constructor(private readonly findAllItemsUseCase: IFindAllItemsUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const findAllItemsResponse = await this.findAllItemsUseCase.execute();
		if (findAllItemsResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(
				findAllItemsResponse.value
			);
		}
		return new SuccessResponse(findAllItemsResponse.value);
	}
}
