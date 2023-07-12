import { Either } from "../../../../helpers/Either";
import DefaultError from "../../../../presentation/errors/default-error";

type UserData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
};

export type CreateUserUseCaseOutput = Either<DefaultError, UserData>;
