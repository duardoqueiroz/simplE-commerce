import DefaultDomainError from "../../../application/errors/domain/default-domain.error";
import { Either, left, right } from "../../../common/helpers/Either";
import BaseEntity from "../base-entity";
import Card from "./card";
import OrderItems, { OrderItem } from "./order-items";
import Status from "./status";
import TotalPrice from "./total-price";
import UserId from "./user-id";

export default class Order extends BaseEntity {
	private constructor(
		private readonly _userId: UserId,
		private readonly _items: OrderItems,
		private readonly _totalPrice: TotalPrice,
		private readonly _status: Status,
		private readonly _card: Card,
		private readonly _createdAt: Date,
		id?: string
	) {
		super(id);
	}

	public static create(
		user_id: string,
		items: OrderItem[],
		total_price: number,
		status: string,
		card: {
			number: string;
			cvv: string;
			expirationDate: string;
			name: string;
		}
	): Either<DefaultDomainError, Order> {
		const userIdOrError = UserId.create(user_id);
		const totalPriceOrError = TotalPrice.create(total_price);
		const statusOrError = Status.create(status);
		const orderItemErrors = OrderItems.create(items);
		const cardOrError = Card.create(
			card.number,
			card.cvv,
			card.expirationDate,
			card.name
		);

		if (userIdOrError.isLeft()) {
			return left(userIdOrError.value);
		}

		if (totalPriceOrError.isLeft()) {
			return left(totalPriceOrError.value);
		}

		if (statusOrError.isLeft()) {
			return left(statusOrError.value);
		}

		if (orderItemErrors.isLeft()) {
			return left(orderItemErrors.value);
		}

		if (cardOrError.isLeft()) {
			return left(cardOrError.value);
		}

		return right(
			new Order(
				userIdOrError.value,
				orderItemErrors.value,
				totalPriceOrError.value,
				statusOrError.value,
				cardOrError.value,
				new Date()
			)
		);
	}

	public static buildExisting(
		id: string,
		userId: string,
		items: OrderItem[],
		totalAmount: number,
		status: string,
		card: {
			number: string;
			cvv: string;
			expirationDate: string;
			name: string;
			iv: string;
		},
		createdAt: Date
	): Order {
		return new Order(
			UserId.buildExisting(userId),
			OrderItems.buildExisting(items),
			TotalPrice.buildExisting(totalAmount),
			Status.buildExisting(status),
			Card.buildExisting(
				card.number,
				card.cvv,
				card.expirationDate,
				card.name,
				card.iv
			),
			createdAt,
			id
		);
	}

	public get userId(): string {
		return this._userId.value;
	}

	public get totalPrice(): number {
		return this._totalPrice.value;
	}

	public get status(): string {
		return this._status.value;
	}

	public get items(): OrderItem[] {
		return this._items.value;
	}

	public get createdAt(): Date {
		return this._createdAt!;
	}

	public get card(): Card {
		return this._card;
	}
}
