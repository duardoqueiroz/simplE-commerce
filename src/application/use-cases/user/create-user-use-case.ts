import User from "../../../domain/entities/user";
import IUserRepository from "../../../domain/repositories/user-repository";
import ICreateUserUseCase from "../../../domain/use-cases/user/create/create-user-use-case";
import { CreateUserUseCaseInput } from "../../../domain/use-cases/user/create/create-user-use-case-input";
import { CreateUserUseCaseOutput } from "../../../domain/use-cases/user/create/create-user-use-case-output";
import { left, right } from "../../../helpers/Either";
import EmailAlreadyInUseError from "../../error/email-already-in-use-error";
import ErrorHandler from "../../services/error-handler";

export default class CreateUserUseCase implements ICreateUserUseCase {
	constructor(public readonly userRepository: IUserRepository) {}

	public async execute(
		input: CreateUserUseCaseInput
	): Promise<CreateUserUseCaseOutput> {
		const userExists = await this.userRepository.findByEmail(input.email);
		if (userExists) {
			return left(new EmailAlreadyInUseError());
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
		});
	}
}
