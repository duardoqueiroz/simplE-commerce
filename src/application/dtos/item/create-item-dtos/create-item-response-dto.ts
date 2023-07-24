import { Either } from "../../../../common/helpers/Either";
import DefaultApplicationError from "../../../errors/application/default-application-error";

type ItemData = {
	id: string;
	userId: string;
	name: string;
	description: string;
	price: number;
	category: string;
	status: string;
};

export type CreateItemResponseDto = Either<DefaultApplicationError, ItemData>;
