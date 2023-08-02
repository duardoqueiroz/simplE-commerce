import { left, right } from "../../../common/helpers/Either";
import IOrderRepository from "../../../domain/repositories/order-repository";
import IRefuseOrderUseCase from "../../../domain/use-cases/order/refuse-order-use-case";
import { RefuseOrderUseCaseResponseDto } from "../../dtos/order/refuse-order-dtos/refuse-order-response-dto";
import OrderNotFoundError from "../../errors/application/order-not-found-error";

export default class RefuseOrderUseCase implements IRefuseOrderUseCase {
	constructor(private readonly orderRepository: IOrderRepository) {}

	public async execute(
		orderId: string
	): Promise<RefuseOrderUseCaseResponseDto> {
		const order = await this.orderRepository.findById(orderId);
		if (!order) {
			return left(new OrderNotFoundError());
		}
		order.refuse();
		const updatedOrder = await this.orderRepository.update(order);
		return right({
			id: updatedOrder.id,
		});
	}
}
