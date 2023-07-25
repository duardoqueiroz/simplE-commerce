import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import { CreateItemRequestDto } from "../../../application/dtos/item/create-item-dtos/create-item-request-dto";
import ErrorHandler from "../../../common/services/error-handler";
import ICreateItemUseCase from "../../../domain/use-cases/item/create-item-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class CreateItemHandler implements HttpHandler {
	constructor(private readonly createItemUseCase: ICreateItemUseCase) {}

	public async handle(
		request: HttpRequest<CreateItemRequestDto>
	): Promise<HttpResponse<unknown>> {
		if (!request || !request.body) {
			return new BadRequestResponse("Body is required");
		}
		if (!request.headers || !request.headers.user_id) {
			return new BadRequestResponse("Headers with user_id is required");
		}
		const { category, description, name, price } = request.body;
		const userId = request.headers.user_id;
		const item = await this.createItemUseCase.execute({
			user_id: userId,
			category: category,
			description: description,
			name: name,
			price: price,
		});
		if (item.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(item.value);
		}
		return new SuccessResponse(item.value);
	}
}
