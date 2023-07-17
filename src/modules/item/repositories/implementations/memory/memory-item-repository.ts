import Item from "../../../entities/item";
import IItemRepository from "../../contracts/item-repository";

export default class MemoryItemRepository implements IItemRepository {
	private items: Item[] = [];

	public async save(item: Item): Promise<Item> {
		// check if item already exists, if so, update it
		const foundItem = await this.findById(item.id);
		if (foundItem) {
			this.items = this.items.map((item) => {
				if (item.id === foundItem.id) {
					item = foundItem;
				}
				return item;
			});
			return foundItem;
		}
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
		throw new Error("Method not implemented.");
	}

	public async delete(id: string): Promise<void> {
		this.items = this.items.filter((item) => item.id !== id);
	}

	public async active(id: string): Promise<void> {
		this.items = this.items.map((item) => {
			if (item.id === id) {
				item.makeItemActive();
			}
			return item;
		});
	}

	public async inactive(id: string): Promise<void> {
		this.items = this.items.map((item) => {
			if (item.id === id) {
				item.makeItemInactive();
			}
			return item;
		});
	}
}
