import Item from "../../entities/item";

export default interface IItemRepository {
	create(item: Item): Promise<Item>;
	findById(id: string): Promise<Item | undefined>;
	findAll(): Promise<Item[]>;
	update(item: Item): Promise<Item | undefined>;
	delete(id: string): Promise<void>;
	active(id: string): Promise<void>;
	inactive(id: string): Promise<void>;
}
