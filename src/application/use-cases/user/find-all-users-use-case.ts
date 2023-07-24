import { right } from "../../../common/helpers/Either";
import IUserRepository from "../../../domain/repositories/user-repository";
import IFindAllUsersUseCase from "../../../domain/use-cases/user/find-all-users-use-case";
import { FindAllUsersUseCaseOutput } from "../../dtos/user/find-all-users-dtos/find-all-users-response-dto";

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
					is_admin: user.isAdmin,
				};
			})
		);
	}
}
