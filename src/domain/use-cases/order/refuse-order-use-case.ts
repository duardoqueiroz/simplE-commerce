import { RefuseOrderUseCaseResponseDto } from "../../../application/dtos/order/refuse-order-dtos/refuse-order-response-dto";

export default interface IRefuseOrderUseCase {
	execute(orderId: string): Promise<RefuseOrderUseCaseResponseDto>;
}
