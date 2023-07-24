import { left, right } from "../../../common/helpers/Either";
import ErrorHandler from "../../../common/services/error-handler";
import User from "../../../domain/entities/user/user";
import IUserRepository from "../../../domain/repositories/user-repository";
import ICreateUserUseCase from "../../../domain/use-cases/user/create-user-use-case";
import { CreateUserUseCaseInput } from "../../dtos/user/sign-up-dtos/sign-up-request-dto";
import { CreateUserUseCaseOutput } from "../../dtos/user/sign-up-dtos/sign-up-response-dto";
import CpfAlreadyInUseError from "../../errors/application/cpf-already-in-use-error";
import EmailAlreadyInUseError from "../../errors/application/email-already-in-use-error";

export default class CreateUserUseCase implements ICreateUserUseCase {
	constructor(public readonly userRepository: IUserRepository) {}

	public async execute(
		input: CreateUserUseCaseInput
	): Promise<CreateUserUseCaseOutput> {
		const userExistsByEmail = await this.userRepository.findByEmail(
			input.email
		);
		if (userExistsByEmail) {
			return left(new EmailAlreadyInUseError());
		}
		const userExistsByCpf = await this.userRepository.findByCpf(
			input.cpf.replace(/\D/g, "")
		);
		if (userExistsByCpf) {
			return left(new CpfAlreadyInUseError());
		}
		const userOrError = await User.create(
			input.name,
			input.email,
			input.cpf,
			input.password
		);
		if (userOrError.isLeft()) {
			return left(ErrorHandler.mapDomainErrorToUseCaseError(userOrError.value));
		}
		const createdUser = await this.userRepository.create(
			userOrError.value as User
		);
		return right({
			id: createdUser.id,
			name: createdUser.name!,
			email: createdUser.email!,
			cpf: createdUser.cpf!,
			is_admin: createdUser.isAdmin,
		});
	}
}
