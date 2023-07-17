import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ErrorHandler from "../../../services/error-handler";
import IFindAllItemsUseCase from "../use-cases/contracts/find-all-items-use-case";

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
