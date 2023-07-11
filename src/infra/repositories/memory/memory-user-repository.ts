import User from "../../../domain/entities/user";
import IUserRepository from "../../../domain/repositories/user-repository";

export default class MemoryUserRepository implements IUserRepository {
	private users: User[];

	public constructor() {
		this.users = [];
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find((user) => user.email === email);
		return user;
	}

	public async findByCpf(cpf: string): Promise<User | undefined> {
		throw new Error("Method not implemented.");
	}

	public async findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find((user) => user.id === id);
		return user;
	}

	public async create(user: User): Promise<User> {
		this.users.push(user);
		return user;
	}
}
