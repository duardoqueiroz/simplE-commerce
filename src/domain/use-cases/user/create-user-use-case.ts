import { CreateUserUseCaseInput } from "../../../application/dtos/user/sign-up-dtos/sign-up-request-dto";
import { CreateUserUseCaseOutput } from "../../../application/dtos/user/sign-up-dtos/sign-up-response-dto";

export default interface ICreateUserUseCase {
	execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput>;
}
