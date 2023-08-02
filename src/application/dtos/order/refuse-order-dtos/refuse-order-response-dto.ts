import { Either } from "../../../../common/helpers/Either";
import DefaultApplicationError from "../../../errors/application/default-application-error";

type OrderData = {
	id: string;
};

export type RefuseOrderUseCaseResponseDto = Either<
	DefaultApplicationError,
	OrderData
>;
