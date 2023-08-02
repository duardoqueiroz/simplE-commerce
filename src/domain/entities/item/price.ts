import InvalidItemPriceError from "../../../application/errors/domain/invalid-item-price-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class Price {
	private constructor(private readonly _value: number) {}

	public static create(value: number): Either<InvalidItemPriceError, Price> {
		let errorMessages: string[] = [];
		if (value < 0) {
			errorMessages.push("Item price must be greater than or equal to 0");
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemPriceError(`Invalid price: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Price(+value.toFixed(2)));
	}

	public static buildExisting(value: number): Price {
		return new Price(value);
	}

	public get value(): number {
		return this._value;
	}
}
