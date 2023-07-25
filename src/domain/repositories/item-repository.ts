import Item from "../entities/item/item";

export default interface IItemRepository {
	create(item: Item): Promise<Item>;
	findById(id: string): Promise<Item | undefined>;
	findAll(): Promise<Item[]>;
	findPending(): Promise<Item[]>;
	findActive(): Promise<Item[]>;
	findInactive(): Promise<Item[]>;
	update(item: Item): Promise<Item | undefined>;
	delete(id: string): Promise<void>;
}
