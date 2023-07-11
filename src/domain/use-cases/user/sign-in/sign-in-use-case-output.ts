import DefaultApplicationError from "../../../../application/error/default-application-error";
import { Either } from "../../../../helpers/Either";

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
