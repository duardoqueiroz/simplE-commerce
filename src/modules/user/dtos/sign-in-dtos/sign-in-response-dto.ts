import { Either } from "../../../../helpers/Either";
import DefaultApplicationError from "../../../../presentation/errors/default-application-error";

type SignInData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
	token: {
		value: string;
		expires_in: number;
	};
};

export type SignInUseCaseOutput = Either<DefaultApplicationError, SignInData>;
