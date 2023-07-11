import DefaultApplicationError from "../../../../application/error/default-application-error";
import { Either } from "../../../../helpers/Either";

type UserData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
};

export type CreateUserUseCaseOutput = Either<DefaultApplicationError, UserData>;
