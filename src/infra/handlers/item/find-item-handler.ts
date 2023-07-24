import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IFindItemUseCase from "../../../domain/use-cases/item/find-item-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class FindItemHandler implements HttpHandler {
	constructor(private readonly findItemUseCase: IFindItemUseCase) {}

	public async handle(
		request: HttpRequest<{ id: string }>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.params) {
			return new BadRequestResponse("Body is required");
		}
		const { id } = request.params;
		const findItemResponse = await this.findItemUseCase.execute(id);
		if (findItemResponse.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(findItemResponse.value);
		}
		return new SuccessResponse(findItemResponse.value);
	}
}
