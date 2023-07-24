import { SignInInputData } from "../../../application/dtos/user/sign-in-dtos/sign-in-request-dto";
import { SignInUseCaseOutput } from "../../../application/dtos/user/sign-in-dtos/sign-in-response-dto";

export default interface ISignInUseCase {
	execute(input: SignInInputData): Promise<SignInUseCaseOutput>;
}
