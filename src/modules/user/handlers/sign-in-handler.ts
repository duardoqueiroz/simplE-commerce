import HttpHandler from "../../../ports/http/http-handler";
import { HttpRequest } from "../../../ports/http/http-request";
import { HttpResponse } from "../../../ports/http/http-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ErrorHandler from "../../../services/error-handler";
import ISignInUseCase from "../use-cases/contracts/sign-in-use-case";

export default class SignInHandler implements HttpHandler {
	constructor(public readonly signInUseCase: ISignInUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { email, password } = request.body;
		const output = await this.signInUseCase.execute({
			email,
			password,
		});
		if (output.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(output.value);
		}
		return new SuccessResponse(output.value);
	}
}
