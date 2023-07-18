import Item from "../../../entities/item";
import IItemRepository from "../../contracts/item-repository";

export default class MemoryItemRepository implements IItemRepository {
	private items: Item[] = [];

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
