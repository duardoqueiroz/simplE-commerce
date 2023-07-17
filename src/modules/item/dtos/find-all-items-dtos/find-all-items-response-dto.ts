import { Either } from "../../../../helpers/Either";
import DefaultApplicationError from "../../../../presentation/errors/application/default-application-error";

type ItemData = {
	id: string;
	user_id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	status: string;
};

export type FindAllItemsResponseDto = Either<
	DefaultApplicationError,
	ItemData[]
>;
