import User from "../../../domain/entities/user/user";
import IUserRepository from "../../../domain/repositories/user-repository";

export default class MemoryUserRepository implements IUserRepository {
	private users: User[];

	public constructor() {
		this.users = [];
	}

	public async delete(id: string): Promise<void> {
		const userIndex = this.users.findIndex((user) => user.id === id);
		this.users.splice(userIndex, 1);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find((user) => user.email === email);
		return user;
	}

	public async findByCpf(cpf: string): Promise<User | undefined> {
		const user = this.users.find((user) => user.cpf === cpf);
		return user;
	}

	public async findAll(): Promise<User[]> {
		return this.users;
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
