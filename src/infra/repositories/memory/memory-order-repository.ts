import Order from "../../../domain/entities/order/order";
import IOrderRepository from "../../../domain/repositories/order-repository";

export default class MemoryOrderRepository implements IOrderRepository {
	private readonly orders: Order[] = [];

	public async create(order: Order): Promise<Order> {
		this.orders.push(order);
		return order;
	}
}
