import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IActiveItemUseCase from "../../../domain/use-cases/item/active-item-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class ActiveItemHandler implements HttpHandler {
	constructor(private readonly itemUseCase: IActiveItemUseCase) {}

	public async handle(
		request: HttpRequest<{ id: string }>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.params) {
			return new BadRequestResponse("Params is required");
		}
		const { id } = request.params;
		const output = await this.itemUseCase.execute(id);
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new SuccessResponse(output.value);
	}
}
