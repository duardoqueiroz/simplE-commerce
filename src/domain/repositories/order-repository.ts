import Order from "../entities/order/order";

export default interface IOrderRepository {
	create(order: Order): Promise<Order>;
}
