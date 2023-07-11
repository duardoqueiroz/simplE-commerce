import { CreateUserUseCaseInput } from "./create-user-use-case-input";
import { CreateUserUseCaseOutput } from "./create-user-use-case-output";

export default interface ICreateUserUseCase {
	execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput>;
}
