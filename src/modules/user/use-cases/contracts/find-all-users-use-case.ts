import { FindAllUsersUseCaseOutput } from "../../dtos/find-all-users-dtos/find-all-users-response-dto";

export default interface IFindAllUsersUseCase {
	execute(): Promise<FindAllUsersUseCaseOutput>;
}
