import { Either, left, right } from "../../../helpers/Either";
import InvalidItemPriceError from "../../../presentation/errors/domain/invalid-item-price-error";

export default class Price {
	private constructor(private readonly _value: number) {}

	public static create(value: number): Either<InvalidItemPriceError, Price> {
		let errorMessages: string[] = [];
		if (value < 0) {
			errorMessages.push("Item price must be greater than or equal to 0");
		}
		if (value > 1000000) {
			errorMessages.push("Item price must be less than or equal to 1000000");
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemPriceError(`Invalid price: ${value}`);
			error.messages = errorMessages;
			return left(error);
		}
		return right(new Price(value));
	}

	public get value(): number {
		return this._value;
	}
}
