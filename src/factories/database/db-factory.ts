import PrismaService from "../../services/prisma-service";
import MemoryRepositories from "../repositories/memory-repository-factory";
import PostgresRepositories from "../repositories/postgres-repository-factory";

class DatabaseFactory {
	constructor() {}

	public postgres(prismaService: PrismaService) {
		return new PostgresRepositories(prismaService);
	}

	public memory() {
		return new MemoryRepositories();
	}
}

export default new DatabaseFactory();
