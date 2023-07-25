import { ITEM_STATUS } from "../../../@types/enums/ITEM_STATUS";
import Item from "../../../domain/entities/item/item";
import IItemRepository from "../../../domain/repositories/item-repository";

export default class MemoryItemRepository implements IItemRepository {
	private items: Item[] = [];

	public async findPending(): Promise<Item[]> {
		return this.items.filter((item) => item.status === ITEM_STATUS.PENDING);
	}

	public async findActive(): Promise<Item[]> {
		return this.items.filter((item) => item.status === ITEM_STATUS.ACTIVE);
	}

	public async findInactive(): Promise<Item[]> {
		return this.items.filter((item) => item.status === ITEM_STATUS.INACTIVE);
	}

	public async create(item: Item): Promise<Item> {
		this.items.push(item);
		return item;
	}

	public async findById(id: string): Promise<Item | undefined> {
		return this.items.find((item) => item.id === id);
	}

	public async findAll(): Promise<Item[]> {
		return this.items;
	}

	public async update(item: Item): Promise<Item | undefined> {
		this.items = this.items.map((itemInMemory) => {
			if (itemInMemory.id === item.id) {
				return item;
			}
			return itemInMemory;
		});
		return item;
	}

	public async delete(id: string): Promise<void> {
		this.items = this.items.filter((item) => item.id !== id);
	}
}
