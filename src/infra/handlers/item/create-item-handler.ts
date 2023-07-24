import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import ErrorHandler from "../../../common/services/error-handler";
import ICreateItemUseCase from "../../../domain/use-cases/item/create-item-use-case";
import { SuccessResponse } from "../../responses/success-response";

export default class CreateItemHandler implements HttpHandler {
	constructor(private readonly createItemUseCase: ICreateItemUseCase) {}

	public async handle(
		request: HttpRequest<any, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const { category, description, name, price } = request.body;
		const userId = request.headers.user_id;
		const item = await this.createItemUseCase.execute({
			userId: userId,
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
