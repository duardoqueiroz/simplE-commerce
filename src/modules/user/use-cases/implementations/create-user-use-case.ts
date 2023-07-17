import { left, right } from "../../../../helpers/Either";
import EmailAlreadyInUseError from "../../../../presentation/errors/application/email-already-in-use-error";
import ErrorHandler from "../../../../services/error-handler";
import { CreateUserUseCaseInput } from "../../dtos/sign-up-dtos/sign-up-request-dto";
import { CreateUserUseCaseOutput } from "../../dtos/sign-up-dtos/sign-up-response-dto";
import User from "../../entities/user";
import IUserRepository from "../../repositories/contracts/user-repository";
import ICreateUserUseCase from "../contracts/create-user-use-case";

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
			is_admin: createdUser.isAdmin,
		});
	}
}
