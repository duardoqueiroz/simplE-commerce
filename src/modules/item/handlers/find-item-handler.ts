import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ErrorHandler from "../../../services/error-handler";
import IFindItemUseCase from "../use-cases/contracts/find-item-use-case";

export default class FindItemHandler implements HttpHandler {
	constructor(private readonly findItemUseCase: IFindItemUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { id } = request.params;
		const findItemResponse = await this.findItemUseCase.execute(id);
		if (findItemResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(findItemResponse.value);
		}
		return new SuccessResponse(findItemResponse.value);
	}
}
