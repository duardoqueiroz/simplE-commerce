import HttpHandler from "../../../ports/http/http-handler";
import { HttpRequest } from "../../../ports/http/http-request";
import { HttpResponse } from "../../../ports/http/http-response";
import BadRequestResponse from "../../../presentation/http-responses/bad-request-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ICreateUserUseCase from "../use-cases/contracts/create-user-use-case";

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
