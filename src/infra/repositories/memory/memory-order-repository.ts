import Order from "../../../domain/entities/order/order";
import IOrderRepository from "../../../domain/repositories/order-repository";

export default class MemoryOrderRepository implements IOrderRepository {
	private readonly orders: Order[] = [];

	public async create(order: Order): Promise<Order> {
		this.orders.push(order);
		return order;
	}

	public async findById(id: string): Promise<Order | undefined> {
		return this.orders.find((order) => order.id === id);
	}

	public async update(order: Order): Promise<Order> {
		const orderIndex = this.orders.findIndex(
			(orderItem) => orderItem.id === order.id
		);
		this.orders[orderIndex] = order;
		return order;
	}
}
