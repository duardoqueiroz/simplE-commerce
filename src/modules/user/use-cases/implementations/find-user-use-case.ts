import { isCPF } from "brazilian-values";
import { left, right } from "../../../../helpers/Either";
import UserNotFoundError from "../../../../presentation/errors/user-not-found-error";
import { FindUserUseCaseOutput } from "../../dtos/find-user-dto/find-user-response-dto";
import IUserRepository from "../../repositories/contracts/user-repository";
import { isEmail } from "../../../../helpers/ValueObjectsHelper";
import User from "../../entities/user";

export default class FindUserUseCase {
	constructor(readonly userRepository: IUserRepository) {}

	public async execute(value: string): Promise<FindUserUseCaseOutput> {
		let user: User | undefined;
		if (isCPF(value)) {
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
		});
	}
}
