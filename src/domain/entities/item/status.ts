import { ITEM_STATUS } from "../../../@types/enums/ITEM_STATUS";
import InvalidItemStatusError from "../../../application/errors/domain/invalid-item-status-error";
import { Either, left, right } from "../../../common/helpers/Either";

export default class Status {
	private constructor(private _value: string) {}

	public static create(value: string): Either<InvalidItemStatusError, Status> {
		let errorMessages: string[] = [];
		if (!value) {
			errorMessages.push("Item status is required");
		} else {
			value = value.toUpperCase();
			if (!Object.values(ITEM_STATUS).includes(value as ITEM_STATUS)) {
				errorMessages.push(
					"Item status does not match any of the allowed values"
				);
			}
		}
		if (errorMessages.length > 0) {
			const error = new InvalidItemStatusError(`Invalid category: ${value}`);
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
}
