import Order from "../entities/order/order";

export default interface IOrderRepository {
	create(order: Order): Promise<Order>;
	findById(id: string): Promise<Order | undefined>;
	update(order: Order): Promise<Order>;
}
