import IRepositoryFactory from "../../contracts/database/repository-factory";
import MemoryItemRepository from "../../modules/item/repositories/implementations/memory/memory-item-repository";
import MemoryUserRepository from "../../modules/user/repositories/implementations/memory/memory-user-repository";

export default class MemoryRepositories implements IRepositoryFactory {
	private _userRepository: MemoryUserRepository;
	private _itemRepository: MemoryItemRepository;

	constructor() {
		this._userRepository = new MemoryUserRepository();
		this._itemRepository = new MemoryItemRepository();
	}

	public get userRepository(): MemoryUserRepository {
		return this._userRepository;
	}

	public get itemRepository(): MemoryItemRepository {
		return this._itemRepository;
	}
}
