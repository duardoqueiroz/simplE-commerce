import IRepositoryFactory from "../../../application/contracts/database/repository-factory";
import MemoryItemRepository from "../../../infra/repositories/memory/memory-item-repository";
import MemoryOrderRepository from "../../../infra/repositories/memory/memory-order-repository";
import MemoryUserRepository from "../../../infra/repositories/memory/memory-user-repository";

export default class MemoryRepositories implements IRepositoryFactory {
	private _userRepository: MemoryUserRepository;
	private _itemRepository: MemoryItemRepository;
	private _orderRepository: MemoryOrderRepository;

	constructor() {
		this._userRepository = new MemoryUserRepository();
		this._itemRepository = new MemoryItemRepository();
		this._orderRepository = new MemoryOrderRepository();
	}

	public get userRepository(): MemoryUserRepository {
		return this._userRepository;
	}

	public get itemRepository(): MemoryItemRepository {
		return this._itemRepository;
	}

	public get orderRepository(): MemoryOrderRepository {
		return this._orderRepository;
	}
}
