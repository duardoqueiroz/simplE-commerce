import HttpHandler from "../../../application/ports/http-handlers/http-handler";
import { HttpRequest } from "../../../application/ports/http-requests/http-request";
import { HttpResponse } from "../../../application/ports/http-responses/http-response";
import ICreateUserUseCase from "../../../domain/use-cases/user/create/create-user-use-case";
import BadRequestResponse from "../responses/bad-request-response";
import { SuccessResponse } from "../responses/success-response";

export default class SignUpHandler implements HttpHandler {
	constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { cpf, email, name, password } = request.body;
		const output = await this.createUserUseCase.execute({
			cpf,
			email,
			name,
			password,
		});
		if (output.isLeft()) {
			return new BadRequestResponse(output.value);
		}
		return new SuccessResponse(output.value);
	}
}
