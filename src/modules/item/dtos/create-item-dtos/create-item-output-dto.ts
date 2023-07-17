import { Either } from "../../../../helpers/Either";
import DefaultApplicationError from "../../../../presentation/errors/application/default-application-error";

type ItemData = {
	id: string;
	userId: string;
	name: string;
	description: string;
	price: number;
	category: string;
	status: string;
};

export type CreateItemOutputDto = Either<DefaultApplicationError, ItemData>;
