import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import IFindAllUsersUseCase from "../use-cases/contracts/find-all-users-use-case";

export default class FindAllUsersHandler implements HttpHandler {
	constructor(readonly userUseCase: IFindAllUsersUseCase) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const output = await this.userUseCase.execute();
		return new SuccessResponse(output.value);
	}
}
