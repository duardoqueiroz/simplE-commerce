import HttpHandler from "../../../application/ports/http-handlers/http-handler";
import { HttpRequest } from "../../../application/ports/http-requests/http-request";
import { HttpResponse } from "../../../application/ports/http-responses/http-response";
import ErrorHandler from "../../../application/services/error-handler";
import ISignInUseCase from "../../../domain/use-cases/user/sign-in/sign-in-use-case";
import { SuccessResponse } from "../responses/success-response";

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
