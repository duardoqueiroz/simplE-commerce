import { ORDER_STATUS } from "../../../@types/enums/ORDER_STATUS";
import InvalidItemStatusError from "../../../application/errors/domain/invalid-item-status-error";
import InvalidOrderStatusError from "../../../application/errors/domain/invalid-order-status-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class Status {
	private constructor(private _value: string) {}

	public static create(value: string): Either<InvalidItemStatusError, Status> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Order status is required");
		} else {
			value = value.toUpperCase();
			if (!Object.values(ORDER_STATUS).includes(value as ORDER_STATUS)) {
				errorMessages.push(
					"Order status does not match any of the allowed values"
				);
			}
		}
		if (errorMessages.length > 0) {
			const error = new InvalidOrderStatusError(`Invalid status: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Status(value));
	}

	public static buildExisting(value: string): Status {
		return new Status(value);
	}

	public get value(): string {
		return this._value;
	}

	public set value(value: string) {
		this._value = value;
	}
}
