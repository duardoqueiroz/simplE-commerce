import uuid from "uuid";

export default class BaseEntity {
	protected readonly _id: string;

	constructor(id?: string) {
		this._id = id || uuid.v4();
	}

	get id(): string {
		return this._id;
	}
}
