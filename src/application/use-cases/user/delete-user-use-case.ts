import { left, right } from "../../../common/helpers/Either";
import { isCpf, isEmail } from "../../../common/helpers/ObjectsHelper";
import User from "../../../domain/entities/user/user";
import IUserRepository from "../../../domain/repositories/user-repository";
import IDeleteUserUseCase from "../../../domain/use-cases/user/delete-user-use-case";
import { DeleteUserResponse } from "../../dtos/user/delete-user-dtos/delete-user-response-dto";
import UserNotFoundError from "../../errors/application/user-not-found-error";

export default class DeleteUserUseCase implements IDeleteUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	public async execute(identifier: string): Promise<DeleteUserResponse> {
		const userExists = await this.findBy(identifier);
		if (!userExists) {
			return left(new UserNotFoundError());
		}
		await this.userRepository.delete(userExists.id);
		return right(undefined);
	}

	private async findBy(value: string): Promise<User | undefined> {
		if (isCpf(value)) {
			return await this.userRepository.findByCpf(value);
		} else if (isEmail(value)) {
			return await this.userRepository.findByEmail(value);
		} else {
			return await this.userRepository.findById(value);
		}
	}
}
