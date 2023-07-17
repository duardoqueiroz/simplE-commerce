import HttpHandler from "../../../contracts/http/http-handler";
import { HttpRequest } from "../../../contracts/http/http-request";
import { HttpResponse } from "../../../contracts/http/http-response";
import BadRequestResponse from "../../../presentation/http-responses/bad-request-response";
import { SuccessResponse } from "../../../presentation/http-responses/success-response";
import ErrorHandler from "../../../services/error-handler";
import { CreateItemInputDto } from "../dtos/create-item-dtos/create-item-input-dto";
import ICreateItemUseCase from "../use-cases/contracts/create-item-use-case";

export default class CreateItemHandler implements HttpHandler {
	constructor(private readonly createItemUseCase: ICreateItemUseCase) {}

	public async handle(
		request: HttpRequest<CreateItemInputDto, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const input = request.body;
		if (!input) {
			return new BadRequestResponse("Missing body");
		}
		input.userId = request.headers.user_id;
		const item = await this.createItemUseCase.execute({
			userId: input.userId,
			category: input.category,
			description: input.description,
			name: input.name,
			price: input.price,
		});
		if (item.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(item.value);
		}
		return new SuccessResponse(item.value);
	}
}
