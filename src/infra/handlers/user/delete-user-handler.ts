import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import IDeleteUserUseCase from "../../../domain/use-cases/user/delete-user-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { NoContentResponse } from "../../responses/no-content-response";

export default class DeleteUserHandler implements HttpHandler {
	constructor(readonly userUseCase: IDeleteUserUseCase) {}

	public async handle(
		request: HttpRequest<{ id: string }>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.params) {
			return new BadRequestResponse("Params is required");
		}
		const { id } = request.params;
		const output = await this.userUseCase.execute(id);
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new NoContentResponse();
	}
}
