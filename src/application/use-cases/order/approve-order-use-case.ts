import { left, right } from "../../../common/helpers/Either";
import IOrderRepository from "../../../domain/repositories/order-repository";
import IApproveOrderUseCase from "../../../domain/use-cases/order/approve-order-use-case";
import { ApproveOrderUseCaseResponseDto } from "../../dtos/order/approve-order-dtos/approve-order-response-dto";
import OrderNotFoundError from "../../errors/application/order-not-found-error";

export default class ApproveOrderUseCase implements IApproveOrderUseCase {
	constructor(private readonly orderRepository: IOrderRepository) {}

	public async execute(
		orderId: string
	): Promise<ApproveOrderUseCaseResponseDto> {
		const order = await this.orderRepository.findById(orderId);
		if (!order) {
			return left(new OrderNotFoundError());
		}
		order.approve();
		const updatedOrder = await this.orderRepository.update(order);
		return right({
			id: updatedOrder.id,
		});
	}
}
