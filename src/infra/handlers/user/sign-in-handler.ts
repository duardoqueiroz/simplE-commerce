import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import ISignInUseCase from "../../../domain/use-cases/user/sign-in-use-case";
import { SuccessResponse } from "../../responses/success-response";

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
