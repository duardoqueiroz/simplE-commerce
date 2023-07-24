import { FindUserUseCaseOutput } from "../../../application/dtos/user/find-user-dto/find-user-response-dto";

export default interface IFindUserUseCase {
	execute(value: string): Promise<FindUserUseCaseOutput>;
}
