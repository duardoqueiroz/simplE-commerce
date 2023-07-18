import { PrismaClient } from "@prisma/client";
import DatabaseConnection from "../contracts/database/connection";

export default class PrismaService
	extends PrismaClient
	implements DatabaseConnection
{
	async connect(): Promise<void> {
		await this.$connect();
	}

	async disconnect(): Promise<void> {
		await this.$disconnect();
	}
}
