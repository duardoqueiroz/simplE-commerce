import { ORDER_STATUS } from "../../../@types/enums/ORDER_STATUS";
import DefaultDomainError from "../../../application/errors/domain/default-domain.error";
import { Either, left, right } from "../../../common/helpers/Either";
import BaseEntity from "../base-entity";
import OrderItems, { OrderItem } from "./order-items";
import Status from "./status";
import TotalPrice from "./total-price";
import UserId from "./user-id";

export default class Order extends BaseEntity {
	private constructor(
		private readonly _userId: UserId,
		private readonly _items: OrderItems,
		private readonly _totalPrice: TotalPrice,
		private _status: Status,
		private readonly _createdAt: Date,
		id?: string
	) {
		super(id);
	}

	public static create(
		user_id: string,
		items: OrderItem[],
		total_price: number,
		status: string
	): Either<DefaultDomainError, Order> {
		const userIdOrError = UserId.create(user_id);
		const totalPriceOrError = TotalPrice.create(total_price);
		const statusOrError = Status.create(status);
		const orderItemErrors = OrderItems.create(items);

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

		return right(
			new Order(
				userIdOrError.value,
				orderItemErrors.value,
				totalPriceOrError.value,
				statusOrError.value,
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
		createdAt: Date
	): Order {
		return new Order(
			UserId.buildExisting(userId),
			OrderItems.buildExisting(items),
			TotalPrice.buildExisting(totalAmount),
			Status.buildExisting(status),
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

	public approve() {
		this._status.value = ORDER_STATUS.APPROVED;
	}

	public refuse() {
		this._status.value = ORDER_STATUS.REFUSED;
	}
}
