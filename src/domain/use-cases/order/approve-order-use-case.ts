import { FindOrderUseCaseResponseDto } from "../../../application/dtos/order/approve-order-dtos/find-order-response-dto";

export default interface IApproveOrderUseCase {
	execute(orderId: string): Promise<FindOrderUseCaseResponseDto>;
}
