import InvalidOrderTotalPriceError from "../../../application/errors/domain/invalid-order-total-price-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class TotalPrice {
	private constructor(private readonly _value: number) {}

	public static create(
		value: number
	): Either<InvalidOrderTotalPriceError, TotalPrice> {
		let errorMessages: string[] = [];
		if (value < 0) {
			errorMessages.push(
				"Order total price must be greater than or equal to 0"
			);
		}
		if (value > 1000000) {
			errorMessages.push("Order total must be less than or equal to 1000000");
		}
		if (errorMessages.length > 0) {
			const error = new InvalidOrderTotalPriceError(`Invalid price: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new TotalPrice(+value.toFixed(2)));
	}

	public static buildExisting(value: number): TotalPrice {
		return new TotalPrice(value);
	}

	public get value(): number {
		return this._value;
	}
}
