import { FindAllUsersUseCaseOutput } from "../../../application/dtos/user/find-all-users-dtos/find-all-users-response-dto";

export default interface IFindAllUsersUseCase {
	execute(): Promise<FindAllUsersUseCaseOutput>;
}
