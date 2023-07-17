import { Either } from "../../../../helpers/Either";
import DefaultApplicationError from "../../../../presentation/errors/application/default-application-error";

export type DeleteItemResponseDto = Either<DefaultApplicationError, void>;
