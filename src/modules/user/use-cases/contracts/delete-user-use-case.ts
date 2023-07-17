import { DeleteUserResponse } from "../../dtos/delete-user-dtos/delete-user-output-dto";

export default interface IDeleteUserUseCase {
	execute(identifier: string): Promise<DeleteUserResponse>;
}
