import { ORDER_STATUS } from "../../../@types/enums/ORDER_STATUS";
import { left, right } from "../../../common/helpers/Either";
import ErrorHandler from "../../../common/services/error-handler";
import Order from "../../../domain/entities/order/order";
import { OrderItem } from "../../../domain/entities/order/order-items";
import IItemRepository from "../../../domain/repositories/item-repository";
import IOrderRepository from "../../../domain/repositories/order-repository";
import IUserRepository from "../../../domain/repositories/user-repository";
import ICreateOrderUseCase from "../../../domain/use-cases/order/create-order-use-case";
import Queue from "../../contracts/queue/queue";
import { CreateOrderRequestDto } from "../../dtos/order/create-order-dtos/create-order-request-dto";
import { CreateOrderResponseDto } from "../../dtos/order/create-order-dtos/create-order-response-dto";
import ItemNotFoundError from "../../errors/application/item-not-found-error";
import UserNotFoundError from "../../errors/application/user-not-found-error";

export default class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly orderRepository: IOrderRepository,
		private readonly itemRepository: IItemRepository,
		private readonly userRepository: IUserRepository,
		private readonly queueService: Queue
	) {}

	public async execute(
		input: CreateOrderRequestDto
	): Promise<CreateOrderResponseDto> {
		const { userId, items, card } = input;
		const user = await this.userRepository.findById(userId);
		if (!user) {
			return left(new UserNotFoundError());
		}

		let orderItems: OrderItem[] = [];
		for (const item of items) {
			const itemEntity = await this.itemRepository.findById(item.item_id);
			if (!itemEntity) {
				return left(new ItemNotFoundError());
			}
			orderItems.push({
				item_id: itemEntity.id,
				quantity: item.quantity,
				unit_price: itemEntity.price,
			});
		}

		const totalPrice = orderItems.reduce((acc, item) => {
			return acc + item.unit_price * item.quantity;
		}, 0);

		const orderOrError = Order.create(
			userId,
			orderItems,
			totalPrice,
			ORDER_STATUS.PENDING,
			{
				cvv: card.cvv,
				expirationDate: card.expiration_date,
				name: card.name,
				number: card.number,
			}
		);
		if (orderOrError.isLeft()) {
			return left(
				ErrorHandler.mapDomainErrorToUseCaseError(orderOrError.value)
			);
		}

		const order = await this.orderRepository.create(orderOrError.value);
		const orderData = {
			id: order.id,
			user_id: order.userId,
			items: order.items,
			price: order.totalPrice,
			status: order.status,
		};
		const cardData = {
			number: order.card.number,
			cvv: order.card.cvv,
			expiration_date: order.card.expirationDate,
			name: order.card.name,
			iv: order.card.iv,
		};
		await this.queueService.emit(
			"ORDER_CREATED",
			JSON.stringify({ ...orderData, card: cardData })
		);
		return right(orderData);
	}
}
