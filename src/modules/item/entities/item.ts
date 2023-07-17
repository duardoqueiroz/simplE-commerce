import BaseEntity from "../../base-entity";
import { ITEM_CATEGORY } from "../enums/ITEM_CATEGORY";
import { ITEM_STATUS } from "../enums/ITEM_STATUS";
import Description from "./description";
import Name from "./name";
import Price from "./price";
import { Either, left, right } from "../../../helpers/Either";
import DefaultDomainError from "../../../presentation/errors/domain/default-domain.error";
import Category from "./category";

export default class Item extends BaseEntity {
	private constructor(
		private _userId: string,
		private _name: Name,
		private _description: Description,
		private _price: Price,
		private _category: Category,
		private _status: ITEM_STATUS,
		id?: string
	) {
		super(id);
	}

	public static create(
		userId: string,
		name: string,
		description: string,
		price: number,
		category: string,
		id?: string
	): Either<DefaultDomainError, Item> {
		const nameOrError = Name.create(name);
		const descriptionOrError = Description.create(description);
		const priceOrError = Price.create(price);
		const categoryOrError = Category.create(category);

		if (nameOrError.isLeft()) {
			return left(nameOrError.value);
		}

		if (descriptionOrError.isLeft()) {
			return left(descriptionOrError.value);
		}

		if (priceOrError.isLeft()) {
			return left(priceOrError.value);
		}

		if (categoryOrError.isLeft()) {
			return left(categoryOrError.value);
		}

		return right(
			new Item(
				userId,
				nameOrError.value as Name,
				descriptionOrError.value as Description,
				priceOrError.value as Price,
				categoryOrError.value as Category,
				ITEM_STATUS.PENDING,
				id
			)
		);
	}

	public get userId(): string {
		return this._userId;
	}

	public get name(): string {
		return this._name.value;
	}

	public get description(): string {
		return this._description.value;
	}

	public get price(): number {
		return this._price.value;
	}

	public get category(): string {
		return this._category.value;
	}

	public get status(): ITEM_STATUS {
		return this._status;
	}

	public makeItemActive(): void {
		this._status = ITEM_STATUS.ACTIVE;
	}

	public makeItemInactive(): void {
		this._status = ITEM_STATUS.INACTIVE;
	}

	public makeItemPending(): void {
		this._status = ITEM_STATUS.PENDING;
	}
}
