import { CreateUserUseCaseInput } from "../../dtos/sign-up-dtos/sign-up-request-dto";
import { CreateUserUseCaseOutput } from "../../dtos/sign-up-dtos/sign-up-response-dto";

export default interface ICreateUserUseCase {
	execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput>;
}
