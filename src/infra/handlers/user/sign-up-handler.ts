import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import { CreateUserRequestDto } from "../../../application/dtos/user/sign-up-dtos/sign-up-request-dto";
import ICreateUserUseCase from "../../../domain/use-cases/user/create-user-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class SignUpHandler implements HttpHandler {
	constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

	public async handle(
		request: HttpRequest<CreateUserRequestDto>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.body) {
			return new BadRequestResponse("Body is required");
		}
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
