import CreateUserUseCase from "./application/use-cases/user/create-user-use-case";
import SignInUseCase from "./application/use-cases/user/sign-in-use-case";
import SignInHandler from "./infra/api/handlers/sign-in-handler";
import SignUpHandler from "./infra/api/handlers/sign-up-handler";
import ExpressServer from "./infra/api/servers/express-server";
import MemoryUserRepository from "./infra/repositories/memory/memory-user-repository";

const server = new ExpressServer();
const userRepositoy = new MemoryUserRepository();
const signUpHandler = new SignUpHandler(new CreateUserUseCase(userRepositoy));
const signInHandler = new SignInHandler(new SignInUseCase(userRepositoy));
server.register("post", "/sign-up", signUpHandler);
server.register("post", "/sign-in", signInHandler);

async function main() {
	await server.start(3000);
}

main();
