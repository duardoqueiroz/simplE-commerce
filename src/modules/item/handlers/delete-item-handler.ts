import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { NoContentResponse } from "../../../presentation/http-responses/no-content-response";
import ErrorHandler from "../../../services/error-handler";
import IDeleteItemUseCase from "../use-cases/contracts/delete-item-use-case";

export default class DeleteItemHandler implements HttpHandler {
	constructor(private readonly deleteItemUseCase: IDeleteItemUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { id } = request.params;
		const output = await this.deleteItemUseCase.execute(id);
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new NoContentResponse();
	}
}
