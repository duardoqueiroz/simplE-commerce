import ActiveItemHandler from "./modules/item/handlers/active-item-handler";
import CreateItemHandler from "./modules/item/handlers/create-item-handler";
import DeleteItemHandler from "./modules/item/handlers/delete-item-handler";
import FindAllItemsHandler from "./modules/item/handlers/find-all-items-handler";
import FindItemHandler from "./modules/item/handlers/find-item-handler";
import MemoryItemRepository from "./modules/item/repositories/implementations/memory/memory-item-repository";
import ActiveItemUseCase from "./modules/item/use-cases/implementations/active-item-use-case";
import CreateItemUseCase from "./modules/item/use-cases/implementations/create-item-use-case";
import DeleteItemUseCase from "./modules/item/use-cases/implementations/delete-item-use-case";
import FindAllItemsUseCase from "./modules/item/use-cases/implementations/find-all-items-use-case";
import FindItemUseCase from "./modules/item/use-cases/implementations/find-item-use-case";
import DeleteUserHandler from "./modules/user/handlers/delete-user-handler";
import FindAllUsersHandler from "./modules/user/handlers/find-all-users";
import FindUserHandler from "./modules/user/handlers/find-user";
import SignInHandler from "./modules/user/handlers/sign-in-handler";
import SignUpHandler from "./modules/user/handlers/sign-up-handler";
import MemoryUserRepository from "./modules/user/repositories/implementations/memory/memory-user-repository";
import CreateUserUseCase from "./modules/user/use-cases/implementations/create-user-use-case";
import DeleteUserUseCase from "./modules/user/use-cases/implementations/delete-user-use-case";
import FindAllUsersUseCase from "./modules/user/use-cases/implementations/find-all-users-use-case";
import FindUserUseCase from "./modules/user/use-cases/implementations/find-user-use-case";
import SignInUseCase from "./modules/user/use-cases/implementations/sign-in-use-case";
import IsAdminMiddleware from "./presentation/middlewares/is-admin-middleware";
import IsAuthenticatedMiddleware from "./presentation/middlewares/is-authenticated-middleware";
import LoggedUserIsTargetUserMiddleware from "./presentation/middlewares/logged-user-is-target-user";
import LoggedUserIsTargetUserItemMiddleware from "./presentation/middlewares/logged-user-is-target-user-item";
import ExpressServer from "./presentation/servers/express-server";
import TokenGenerator from "./services/token-generator";

const server = new ExpressServer();
const tokenGenerator = new TokenGenerator(
	process.env.JWT_SECRET!,
	+process.env.JWT_EXPIRES_IN!
);
const userRepositoy = new MemoryUserRepository();
const itemRepository = new MemoryItemRepository();
// -------------- USE CASES --------------
const createUserUseCase = new CreateUserUseCase(userRepositoy);
const signUpUseCase = new SignInUseCase(userRepositoy, tokenGenerator);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepositoy);
const findUserUseCase = new FindUserUseCase(userRepositoy);
const deleteUserUseCase = new DeleteUserUseCase(userRepositoy);
const createItemUseCase = new CreateItemUseCase(itemRepository, userRepositoy);
const findAllItemsUseCase = new FindAllItemsUseCase(itemRepository);
const findItemUseCase = new FindItemUseCase(itemRepository);
const deleteItemUseCase = new DeleteItemUseCase(itemRepository);
const activeItemUseCase = new ActiveItemUseCase(itemRepository);
// -------------- HANDLERS --------------
const signUpHandler = new SignUpHandler(createUserUseCase);
const signInHandler = new SignInHandler(signUpUseCase);
const findAllUsersHandler = new FindAllUsersHandler(findAllUsersUseCase);
const findUserHandler = new FindUserHandler(findUserUseCase);
const deleteUserHandler = new DeleteUserHandler(deleteUserUseCase);
const createItemHandler = new CreateItemHandler(createItemUseCase);
const findAllItemsHandler = new FindAllItemsHandler(findAllItemsUseCase);
const findItemHandler = new FindItemHandler(findItemUseCase);
const deleteItemHandler = new DeleteItemHandler(deleteItemUseCase);
const activeItemHandler = new ActiveItemHandler(activeItemUseCase);
// -------------- MIDDLEWARES --------------
const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(
	tokenGenerator,
	userRepositoy
);
const loggedUserIsTargetUserMiddleware = new LoggedUserIsTargetUserMiddleware();
const loggedUserIsTargetUserItemMiddleware =
	new LoggedUserIsTargetUserItemMiddleware(itemRepository);
const isAdminMiddleware = new IsAdminMiddleware(userRepositoy);
// -------------- ROUTES --------------
server.register("post", "/sign-up", signUpHandler);
server.register("post", "/sign-in", signInHandler);
server.register(
	"get",
	"/users",
	findAllUsersHandler,
	isAuthenticatedMiddleware
);
server.register("get", "/users/:id", findUserHandler);
server.register(
	"delete",
	"/users/:id",
	deleteUserHandler,
	isAuthenticatedMiddleware,
	loggedUserIsTargetUserMiddleware
);
server.register("post", "/items", createItemHandler, isAuthenticatedMiddleware);
server.register("get", "/items", findAllItemsHandler);
server.register("get", "/items/:id", findItemHandler);
server.register(
	"delete",
	"/items/:id",
	deleteItemHandler,
	isAuthenticatedMiddleware,
	loggedUserIsTargetUserItemMiddleware
);
server.register(
	"put",
	"/items/:id/active",
	activeItemHandler,
	isAuthenticatedMiddleware,
	isAdminMiddleware
);

// -------------- MAIN --------------
async function main() {
	await server.start(3000);
}

main();
