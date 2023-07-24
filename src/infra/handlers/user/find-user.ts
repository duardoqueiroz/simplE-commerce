import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import IFindUserUseCase from "../../../domain/use-cases/user/find-user-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class FindUserHandler implements HttpHandler {
	constructor(readonly userUseCase: IFindUserUseCase) {}

	public async handle(
		request: HttpRequest<{ id: string }>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.params) {
			return new BadRequestResponse("Params is required");
		}
		const { id } = request.params;
		const output = await this.userUseCase.execute(id);
		return new SuccessResponse(output.value);
	}
}
