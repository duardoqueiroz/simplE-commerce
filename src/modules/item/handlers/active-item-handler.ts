import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ErrorHandler from "../../../services/error-handler";
import IActiveItemUseCase from "../use-cases/contracts/active-item-use-case";

export default class ActiveItemHandler implements HttpHandler {
	constructor(private readonly itemUseCase: IActiveItemUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { id } = request.params;
		const output = await this.itemUseCase.execute(id);
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new SuccessResponse(output.value);
	}
}
