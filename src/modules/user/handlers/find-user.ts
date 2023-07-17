import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import IFindUserUseCase from "../use-cases/contracts/find-user-use-case";

export default class FindUserHandler implements HttpHandler {
	constructor(readonly userUseCase: IFindUserUseCase) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const { id } = request.params;
		const output = await this.userUseCase.execute(id);
		return new SuccessResponse(output.value);
	}
}
