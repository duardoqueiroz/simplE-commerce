import IRepositoryFactory from "../../contracts/database/repository-factory";
import PostgresItemRepository from "../../modules/item/repositories/implementations/postgres/postgres-item-repository";
import PostgresUserRepository from "../../modules/user/repositories/implementations/postgres/postgres-user-repository";
import PrismaService from "../../services/prisma-service";

export default class PostgresRepositories implements IRepositoryFactory {
	public _userRepository: PostgresUserRepository;
	public _itemRepository: PostgresItemRepository;

	constructor(readonly prismaService: PrismaService) {
		this._userRepository = new PostgresUserRepository(prismaService);
		this._itemRepository = new PostgresItemRepository(prismaService);
	}

	public get itemRepository(): PostgresItemRepository {
		return this._itemRepository;
	}

	public get userRepository(): PostgresUserRepository {
		return this._userRepository;
	}
}
