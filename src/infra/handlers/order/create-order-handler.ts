import HttpHandler from "../../../application/contracts/http/http-handler";
import { HttpRequest } from "../../../application/contracts/http/http-request";
import { HttpResponse } from "../../../application/contracts/http/http-response";
import { CreateOrderRequestDto } from "../../../application/dtos/order/create-order-dtos/create-order-request-dto";
import ErrorHandler from "../../../common/services/error-handler";
import ICreateOrderUseCase from "../../../domain/use-cases/order/create-order-use-case";
import BadRequestResponse from "../../responses/bad-request-response";
import { SuccessResponse } from "../../responses/success-response";

export default class CreateOrderHandler implements HttpHandler {
	constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}

	public async handle(
		request: HttpRequest<CreateOrderRequestDto, any, any, any, any>
	): Promise<HttpResponse<unknown>> {
		const body = request.body;
		if (!body) {
			return new BadRequestResponse("Body is required");
		}
		const { items, card } = body;
		const userId = request.headers.user_id;

		const result = await this.createOrderUseCase.execute({
			userId,
			items,
			card,
		});

		if (result.isLeft()) {
			return ErrorHandler.mapUseCaseErrorToHttpResponse(result.value);
		}

		return new SuccessResponse(result.value);
	}
}
