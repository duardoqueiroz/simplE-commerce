import { left, right } from "../../../common/helpers/Either";
import TokenGenerator from "../../../common/services/token-generator";
import IUserRepository from "../../../domain/repositories/user-repository";
import ISignInUseCase from "../../../domain/use-cases/user/sign-in-use-case";
import { SignInRequestDto } from "../../dtos/user/sign-in-dtos/sign-in-request-dto";
import { SignInUseCaseResponse } from "../../dtos/user/sign-in-dtos/sign-in-response-dto";
import AuthenticationFailedError from "../../errors/application/authentication-failed-error";

export default class SignInUseCase implements ISignInUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly tokenGenerator: TokenGenerator
	) {}

	public async execute(
		input: SignInRequestDto
	): Promise<SignInUseCaseResponse> {
		const user = await this.userRepository.findByEmail(input.email);
		if (!user) {
			return left(new AuthenticationFailedError());
		}
		const passwordMatch = await user!.password.compare(input.password);
		if (!passwordMatch) {
			return left(new AuthenticationFailedError());
		}
		const token = this.tokenGenerator.generate({ user_id: user!.id });
		return right({
			cpf: user!.cpf,
			email: user!.email,
			id: user!.id,
			name: user!.name,
			token,
		});
	}
}
