import Description from "./description";
import Name from "./name";
import Price from "./price";
import { Either, left, right } from "../../../common/helpers/Either";
import Category from "./category";
import Status from "./status";
import { ITEM_STATUS } from "../../../@types/enums/ITEM_STATUS";
import DefaultDomainError from "../../../application/errors/domain/default-domain.error";
import BaseEntity from "../base-entity";

export default class Item extends BaseEntity {
	private constructor(
		private _userId: string,
		private _name: Name,
		private _description: Description,
		private _price: Price,
		private _category: Category,
		private _status: Status,
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
		const statusOrError = Status.create(ITEM_STATUS.PENDING);

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

		if (statusOrError.isLeft()) {
			return left(statusOrError.value);
		}

		return right(
			new Item(
				userId,
				nameOrError.value as Name,
				descriptionOrError.value as Description,
				priceOrError.value as Price,
				categoryOrError.value as Category,
				statusOrError.value as Status,
				id
			)
		);
	}

	public static buildExisting(
		id: string,
		userId: string,
		name: string,
		description: string,
		price: number,
		category: string,
		status: string
	): Item {
		return new Item(
			userId,
			Name.buildExisting(name),
			Description.buildExisting(description),
			Price.buildExisting(price),
			Category.buildExisting(category),
			Status.buildExisting(status),
			id
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

	public get status(): string {
		return this._status.value;
	}

	public makeItemActive(): void {
		this._status = Status.create(ITEM_STATUS.ACTIVE).value as Status;
	}

	public makeItemInactive(): void {
		this._status = Status.create(ITEM_STATUS.INACTIVE).value as Status;
	}

	public makeItemPending(): void {
		this._status = Status.create(ITEM_STATUS.PENDING).value as Status;
	}
}
