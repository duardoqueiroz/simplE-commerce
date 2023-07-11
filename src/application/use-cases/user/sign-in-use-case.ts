import IUserRepository from "../../../domain/repositories/user-repository";
import ISignInUseCase from "../../../domain/use-cases/user/sign-in/sign-in-use-case";
import { SignInInputData } from "../../../domain/use-cases/user/sign-in/sign-in-use-case-input";
import { SignInUseCaseOutput } from "../../../domain/use-cases/user/sign-in/sign-in-use-case-output";
import { left, right } from "../../../helpers/Either";
import AuthenticationFailedError from "../../error/authentication-failed-error";
import TokenGenerator from "../../services/token-generator";

export default class SignInUseCase implements ISignInUseCase {
	constructor(public readonly userRepository: IUserRepository) {}

	public async execute(input: SignInInputData): Promise<SignInUseCaseOutput> {
		const user = await this.userRepository.findByEmail(input.email);
		if (!user) {
			return left(new AuthenticationFailedError("Authentication Failed"));
		}
		const passwordMatch = await user!.password.compare(input.password);
		if (!passwordMatch) {
			return left(new AuthenticationFailedError("Authentication Failed"));
		}
		const token = new TokenGenerator("secret").generate(
			{ email: user!.email },
			3600,
			new Date()
		);
		return right({
			cpf: user!.cpf,
			email: user!.email,
			id: user!.id,
			name: user!.name,
			token,
		});
	}
}
