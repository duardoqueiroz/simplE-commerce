import { FindUserUseCaseOutput } from "./find-user-use-case-output";

export default interface IFindUserUseCase {
	execute(value: string): Promise<FindUserUseCaseOutput>;
}
