import { left, right } from "../../../../helpers/Either";
import UserNotFoundError from "../../../../presentation/errors/application/user-not-found-error";
import { DeleteUserResponse } from "../../dtos/delete-user-dtos/delete-user-output-dto";
import IUserRepository from "../../repositories/contracts/user-repository";
import IDeleteUserUseCase from "../contracts/delete-user-use-case";
import User from "../../entities/user";
import { isEmail, isCpf } from "../../../../helpers/ObjectsHelper";

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
