import { right } from "../../../../helpers/Either";
import { FindAllUsersUseCaseOutput } from "../../dtos/find-all-users-dtos/find-all-users-response-dto";
import IUserRepository from "../../repositories/contracts/user-repository";
import IFindAllUsersUseCase from "../contracts/find-all-users-use-case";

export default class FindAllUsersUseCase implements IFindAllUsersUseCase {
	constructor(readonly userRepository: IUserRepository) {}

	public async execute(): Promise<FindAllUsersUseCaseOutput> {
		const users = await this.userRepository.findAll();
		return right(
			users.map((user) => {
				return {
					id: user.id,
					cpf: user.cpf,
					email: user.email,
					name: user.name,
				};
			})
		);
	}
}
