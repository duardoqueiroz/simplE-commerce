import { isCPF } from "brazilian-values";
import { left, right } from "../../../../helpers/Either";
import { FindUserUseCaseOutput } from "../../dtos/find-user-dto/find-user-response-dto";
import IUserRepository from "../../repositories/contracts/user-repository";
import { isEmail } from "../../../../helpers/ObjectsHelper";
import User from "../../entities/user";
import UserNotFoundError from "../../../../presentation/errors/application/user-not-found-error";

export default class FindUserUseCase {
	constructor(readonly userRepository: IUserRepository) {}

	public async execute(value: string): Promise<FindUserUseCaseOutput> {
		let user: User | undefined;
		if (isCPF(value)) {
			value = value.replace(/\D/g, "");
			user = await this.userRepository.findByCpf(value);
		} else if (isEmail(value)) {
			user = await this.userRepository.findByEmail(value);
		} else {
			user = await this.userRepository.findById(value);
		}
		if (!user) {
			return left(new UserNotFoundError());
		}
		return right({
			cpf: user.cpf,
			email: user.email,
			id: user.id,
			name: user.name,
			is_admin: user.isAdmin,
		});
	}
}
