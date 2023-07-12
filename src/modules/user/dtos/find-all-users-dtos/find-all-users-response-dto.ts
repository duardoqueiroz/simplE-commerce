import { Either } from "../../../../helpers/Either";

type UserData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
};

export type FindAllUsersUseCaseOutput = Either<Error, UserData[]>;
