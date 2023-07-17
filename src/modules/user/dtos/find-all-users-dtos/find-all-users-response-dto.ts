import { Either } from "../../../../helpers/Either";
import DefaultApplicationError from "../../../../presentation/errors/application/default-application-error";

type UserData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
	is_admin: boolean;
};

export type FindAllUsersUseCaseOutput = Either<
	DefaultApplicationError,
	UserData[]
>;
