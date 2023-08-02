import { ApproveOrderUseCaseResponseDto } from "../../../application/dtos/order/approve-order-dtos/approve-order-response-dto";

export default interface IApproveOrderUseCase {
	execute(orderId: string): Promise<ApproveOrderUseCaseResponseDto>;
}
