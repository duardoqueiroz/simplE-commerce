import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindItemUseCase from "../../../domain/use-cases/item/find-item-use-case";
import { SuccessResponse } from "../../responses/success-response";

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
