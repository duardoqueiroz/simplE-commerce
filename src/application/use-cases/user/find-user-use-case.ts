import IUserRepository from "../../../domain/repositories/user-repository";
import IFindUserByIdUseCase from "../../../domain/use-cases/user/find/find-user-use-case";
import { FindUserUseCaseOutput } from "../../../domain/use-cases/user/find/find-user-use-case-output";
import { left, right } from "../../../helpers/Either";
import UserNotFoundError from "../../error/user-not-found-error";

export default class FindUserUseCase implements IFindUserByIdUseCase {
	constructor(readonly userRepository: IUserRepository) {}

	public async execute(value: string): Promise<FindUserUseCaseOutput> {
		const user = await this.userRepository.findById(value);
		if (!user) {
			return left(new UserNotFoundError());
		}
		return right(user);
	}
}
