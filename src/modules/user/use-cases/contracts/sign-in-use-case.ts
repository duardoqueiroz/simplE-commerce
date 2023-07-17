import { SignInInputData } from "../../dtos/sign-in-dtos/sign-in-request-dto";
import { SignInUseCaseOutput } from "../../dtos/sign-in-dtos/sign-in-response-dto";

export default interface ISignInUseCase {
	execute(input: SignInInputData): Promise<SignInUseCaseOutput>;
}
