import { CreateOrderRequestDto } from "../../../application/dtos/order/create-order-dtos/create-order-request-dto";
import { CreateOrderResponseDto } from "../../../application/dtos/order/create-order-dtos/create-order-response-dto";

export default interface ICreateOrderUseCase {
	execute(input: CreateOrderRequestDto): Promise<CreateOrderResponseDto>;
}
