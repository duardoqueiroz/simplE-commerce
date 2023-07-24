import { Either } from "../../../../common/helpers/Either";
import DefaultApplicationError from "../../../errors/application/default-application-error";

export type DeleteUserResponse = Either<DefaultApplicationError, void>;
