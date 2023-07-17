import User from "../../entities/user";

export default interface IUserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	findByCpf(cpf: string): Promise<User | undefined>;
	findAll(): Promise<User[]>;
	delete(id: string): Promise<void>;
}
