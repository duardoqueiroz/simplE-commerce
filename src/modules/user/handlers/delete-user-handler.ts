import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { NoContentResponse } from "../../../presentation/http-responses/no-content-response";
import ErrorHandler from "../../../services/error-handler";
import IDeleteUserUseCase from "../use-cases/contracts/delete-user-use-case";

export default class DeleteUserHandler implements HttpHandler {
	constructor(readonly userUseCase: IDeleteUserUseCase) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const { id } = request.params;
		const output = await this.userUseCase.execute(id);
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new NoContentResponse();
	}
}
