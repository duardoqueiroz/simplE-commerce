import { Either } from "../../../../common/helpers/Either";
import DefaultApplicationError from "../../../errors/application/default-application-error";

type SignInData = {
	id: string;
	name: string;
	email: string;
	cpf: string;
	token: {
		value: string;
		expires_in: string;
	};
};

export type SignInUseCaseResponse = Either<DefaultApplicationError, SignInData>;
