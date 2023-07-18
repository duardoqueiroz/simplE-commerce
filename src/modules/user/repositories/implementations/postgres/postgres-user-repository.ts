import PrismaService from "../../../../../services/prisma-service";
import User from "../../../entities/user";
import IUserRepository from "../../contracts/user-repository";

export default class PostgresUserRepository implements IUserRepository {
	constructor(private readonly prisma: PrismaService) {}

	public async create(user: User): Promise<User> {
		const createdUser = await this.prisma.users.create({
			data: {
				id: user.id,
				email: user.email,
				name: user.name,
				cpf: user.cpf,
				password: user.password.value,
				is_admin: user.isAdmin,
			},
		});
		return User.buildExisting(
			createdUser.name,
			createdUser.email,
			createdUser.cpf,
			createdUser.password,
			createdUser.is_admin,
			createdUser.id
		);
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.prisma.users.findFirst({
			where: {
				id,
			},
		});
		if (!user) {
			return undefined;
		}
		return User.buildExisting(
			user.name,
			user.email,
			user.cpf,
			user.password,
			user.is_admin,
			user.id
		);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.prisma.users.findFirst({
			where: {
				email,
			},
		});
		if (!user) {
			return undefined;
		}
		return User.buildExisting(
			user.name,
			user.email,
			user.cpf,
			user.password,
			user.is_admin,
			user.id
		);
	}

	public async findByCpf(cpf: string): Promise<User | undefined> {
		const user = await this.prisma.users.findFirst({
			where: {
				cpf,
			},
		});
		if (!user) {
			return undefined;
		}
		return User.buildExisting(
			user.name,
			user.email,
			user.cpf,
			user.password,
			user.is_admin,
			user.id
		);
	}

	public async findAll(): Promise<User[]> {
		const users = await this.prisma.users.findMany();
		return users.map((user) => {
			return User.buildExisting(
				user.name,
				user.email,
				user.cpf,
				user.password,
				user.is_admin,
				user.id
			);
		});
	}

	public async delete(id: string): Promise<void> {
		await this.prisma.users.delete({
			where: {
				id,
			},
		});
	}
}
