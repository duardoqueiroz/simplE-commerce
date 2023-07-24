import IRepositoryFactory from "../../../application/contracts/database/repository-factory";
import PrismaService from "../../../common/services/prisma-service";
import PostgresItemRepository from "../../../infra/repositories/postgres/postgres-item-repository";
import PostgresOrderRepository from "../../../infra/repositories/postgres/postgres-order-repository";
import PostgresUserRepository from "../../../infra/repositories/postgres/postgres-user-repository";

export default class PostgresRepositories implements IRepositoryFactory {
	public _userRepository: PostgresUserRepository;
	public _itemRepository: PostgresItemRepository;
	public _orderRepository: PostgresOrderRepository;

	constructor(readonly prismaService: PrismaService) {
		this._userRepository = new PostgresUserRepository(prismaService);
		this._itemRepository = new PostgresItemRepository(prismaService);
		this._orderRepository = new PostgresOrderRepository(prismaService);
	}

	public get itemRepository(): PostgresItemRepository {
		return this._itemRepository;
	}

	public get userRepository(): PostgresUserRepository {
		return this._userRepository;
	}

	public get orderRepository(): PostgresOrderRepository {
		return this._orderRepository;
	}
}
