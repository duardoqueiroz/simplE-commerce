import { Either } from "../../../../common/helpers/Either";
import DefaultApplicationError from "../../../errors/application/default-application-error";

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
