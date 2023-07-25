import { order_status } from "@prisma/client";
import PrismaService from "../../../common/services/prisma-service";
import Order from "../../../domain/entities/order/order";
import IOrderRepository from "../../../domain/repositories/order-repository";

export default class PostgresOrderRepository implements IOrderRepository {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(order: Order): Promise<Order> {
		const createdOrder = await this.prismaService.orders.create({
			data: {
				id: order.id,
				total_amount: order.totalPrice,
				order_items: {
					createMany: {
						data: order.items.map((orderItem) => {
							return {
								item_id: orderItem.item_id,
								quantity: orderItem.quantity,
								unit_price: orderItem.unit_price,
							};
						}),
					},
				},
				status: order_status[order.status as keyof typeof order_status],
				user_id: order.userId,
				created_at: order.createdAt,
			},
			select: {
				id: true,
				order_items: {
					select: {
						id: true,
						item_id: true,
						quantity: true,
						unit_price: true,
					},
				},
				total_amount: true,
				user_id: true,
				status: true,
				created_at: true,
			},
		});
		return Order.buildExisting(
			createdOrder.id,
			createdOrder.user_id,
			createdOrder.order_items.map((orderItem) => {
				return {
					item_id: orderItem.item_id,
					quantity: orderItem.quantity,
					unit_price: orderItem.unit_price,
				};
			}),
			createdOrder.total_amount,
			createdOrder.status,
			createdOrder.created_at
		);
	}
}
