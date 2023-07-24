import InvalidOrderItemError from "../../../application/errors/domain/invalid-order-item-error";
import { Either, left, right } from "../../../common/helpers/Either";

export type OrderItem = {
	item_id: string;
	quantity: number;
	unit_price: number;
};

export default class OrderItems {
	private constructor(private readonly _items: OrderItem[]) {}

	public static create(
		items: OrderItem[]
	): Either<InvalidOrderItemError, OrderItems> {
		const errorMessages: string[] = [];
		if (items.length === 0) {
			errorMessages.push("Order items is required");
		} else {
			items.forEach((item) => {
				if (!item.item_id) {
					errorMessages.push("Item id is required");
				}
				if (!item.quantity) {
					errorMessages.push("Item quantity is required");
				} else if (item.quantity < 1) {
					errorMessages.push("Item quantity must be greater than 0");
				}
				if (!item.unit_price) {
					errorMessages.push("Item unit price is required");
				} else if (item.unit_price < 0) {
					errorMessages.push(
						"Item unit price must be greater than or equal to 0"
					);
				}

				if (errorMessages.length > 0) {
					return;
				}
			});
		}

		if (errorMessages.length > 0) {
			const error = new InvalidOrderItemError(`Invalid order item`);
			error.messages = errorMessages;
			return left(error);
		}

		return right(new OrderItems(items));
	}

	public static buildExisting(items: OrderItem[]): OrderItems {
		return new OrderItems(items);
	}

	public get value(): OrderItem[] {
		return this._items;
	}
}
