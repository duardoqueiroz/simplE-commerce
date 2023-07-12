import { left, right } from "../../../../helpers/Either";
import AuthenticationFailedError from "../../../../presentation/errors/authentication-failed-error";
import TokenGenerator from "../../../../services/token-generator";
import { SignInInputData } from "../../dtos/sign-in-dtos/sign-in-request-dto";
import { SignInUseCaseOutput } from "../../dtos/sign-in-dtos/sign-in-response-dto";
import IUserRepository from "../../repositories/contracts/user-repository";
import ISignInUseCase from "../contracts/sign-in-use-case";

export default class SignInUseCase implements ISignInUseCase {
	constructor(public readonly userRepository: IUserRepository) {}

	public async execute(input: SignInInputData): Promise<SignInUseCaseOutput> {
		const user = await this.userRepository.findByEmail(input.email);
		if (!user) {
			return left(new AuthenticationFailedError());
		}
		const passwordMatch = await user!.password.compare(input.password);
		if (!passwordMatch) {
			return left(new AuthenticationFailedError());
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
