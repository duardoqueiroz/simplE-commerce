import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import IFindAllUsersUseCase from "../../../domain/use-cases/user/find-all-users-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class FindAllUsersHandler implements HttpHandler {
	constructor(readonly userUseCase: IFindAllUsersUseCase) {}

	public async handle(request: HttpRequest): Promise<HttpResponse<unknown>> {
		const output = await this.userUseCase.execute();
		return new SuccessResponse(output.value);
	}
}
