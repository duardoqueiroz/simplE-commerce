import { Either } from "../../../../helpers/Either";
import User from "../../../entities/user";

export type FindUserUseCaseOutput = Either<Error, Omit<User, "passwordHash">>;
