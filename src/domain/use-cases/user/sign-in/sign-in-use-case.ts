import { SignInInputData } from "./sign-in-use-case-input";
import { SignInUseCaseOutput } from "./sign-in-use-case-output";

export default interface ISignInUseCase {
	execute(input: SignInInputData): Promise<SignInUseCaseOutput>;
}
