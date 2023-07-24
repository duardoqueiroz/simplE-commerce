import { CreateUserRequestDto } from "../../../application/dtos/user/sign-up-dtos/sign-up-request-dto";
import { CreateUserUseCaseResponse } from "../../../application/dtos/user/sign-up-dtos/sign-up-response-dto";

export default interface ICreateUserUseCase {
	execute(input: CreateUserRequestDto): Promise<CreateUserUseCaseResponse>;
}
