import FindAllUsersHandler from "./modules/user/handlers/find-all-users";
import FindUserHandler from "./modules/user/handlers/find-user";
import SignInHandler from "./modules/user/handlers/sign-in-handler";
import SignUpHandler from "./modules/user/handlers/sign-up-handler";
import MemoryUserRepository from "./modules/user/repositories/implementations/memory/memory-user-repository";
import CreateUserUseCase from "./modules/user/use-cases/implementations/create-user-use-case";
import FindAllUsersUseCase from "./modules/user/use-cases/implementations/find-all-users-use-case";
import FindUserUseCase from "./modules/user/use-cases/implementations/find-user-use-case";
import SignInUseCase from "./modules/user/use-cases/implementations/sign-in-use-case";
import ExpressServer from "./presentation/servers/express-server";

const server = new ExpressServer();
const userRepositoy = new MemoryUserRepository();
const signUpHandler = new SignUpHandler(new CreateUserUseCase(userRepositoy));
const signInHandler = new SignInHandler(new SignInUseCase(userRepositoy));
const findAllUsersHandler = new FindAllUsersHandler(
	new FindAllUsersUseCase(userRepositoy)
);
const findUserHandler = new FindUserHandler(new FindUserUseCase(userRepositoy));

server.register("post", "/sign-up", signUpHandler);
server.register("post", "/sign-in", signInHandler);
server.register("get", "/users", findAllUsersHandler);
server.register("get", "/users/:id", findUserHandler);

async function main() {
	await server.start(3000);
}

main();
