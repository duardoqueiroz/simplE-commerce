import { SignInRequestDto } from "../../../application/dtos/user/sign-in-dtos/sign-in-request-dto";
import { SignInUseCaseResponse } from "../../../application/dtos/user/sign-in-dtos/sign-in-response-dto";

export default interface ISignInUseCase {
	execute(input: SignInRequestDto): Promise<SignInUseCaseResponse>;
}
