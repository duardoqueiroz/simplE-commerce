import ActiveItemUseCase from "../application/use-cases/item/active-item-use-case";
import CreateItemUseCase from "../application/use-cases/item/create-item-use-case";
import DeleteItemUseCase from "../application/use-cases/item/delete-item-use-case";
import FindAllItemsUseCase from "../application/use-cases/item/find-all-items-use-case";
import FindItemUseCase from "../application/use-cases/item/find-item-use-case";
import CreateOrderUseCase from "../application/use-cases/order/create-order-use-case";
import CreateUserUseCase from "../application/use-cases/user/create-user-use-case";
import DeleteUserUseCase from "../application/use-cases/user/delete-user-use-case";
import FindAllUsersUseCase from "../application/use-cases/user/find-all-users-use-case";
import FindUserUseCase from "../application/use-cases/user/find-user-use-case";
import SignInUseCase from "../application/use-cases/user/sign-in-use-case";
import PrismaService from "../common/services/prisma-service";
import TokenGenerator from "../common/services/token-generator";
import ActiveItemHandler from "../infra/handlers/item/active-item-handler";
import CreateItemHandler from "../infra/handlers/item/create-item-handler";
import DeleteItemHandler from "../infra/handlers/item/delete-item-handler";
import FindAllItemsHandler from "../infra/handlers/item/find-all-items-handler";
import FindItemHandler from "../infra/handlers/item/find-item-handler";
import CreateOrderHandler from "../infra/handlers/order/create-order-handler";
import DeleteUserHandler from "../infra/handlers/user/delete-user-handler";
import FindAllUsersHandler from "../infra/handlers/user/find-all-users";
import FindUserHandler from "../infra/handlers/user/find-user";
import SignInHandler from "../infra/handlers/user/sign-in-handler";
import SignUpHandler from "../infra/handlers/user/sign-up-handler";
import IsAdminMiddleware from "../infra/middlewares/is-admin-middleware";
import IsAuthenticatedMiddleware from "../infra/middlewares/is-authenticated-middleware";
import LoggedUserIsTargetUserMiddleware from "../infra/middlewares/logged-user-is-target-user";
import LoggedUserIsTargetUserItemMiddleware from "../infra/middlewares/logged-user-is-target-user-item";
import Env from "./config";
import dbFactory from "./factories/database/db-factory";
import serversFactory from "./factories/servers/servers-factory";
import queueFactory from "./factories/queue/queue-factory";
import FindPendingItemsUseCase from "../application/use-cases/item/find-pending-items-use-case";
import FindActiveItemsUseCase from "../application/use-cases/item/find-active-items-use-case";
import FindInactiveItemsUseCase from "../application/use-cases/item/find-inactive-items-use-case";
import FindActiveItemsHandler from "../infra/handlers/item/find-active-items-handler";
import FindInactiveItemsHandler from "../infra/handlers/item/find-inactive-items-handler";
import FindPendingItemsHandler from "../infra/handlers/item/find-pending-items-handler";
import IsActiveItemOrUserIsItemOwnerMiddleware from "../infra/middlewares/is-active-item-or-user-is-item-owner";
import QueueHandler from "../infra/queue/queue-handler";

Env.initialize();

const tokenGenerator = new TokenGenerator(
	Env.get<string>("JWT_SECRET"),
	Env.get<string>("JWT_EXPIRES_IN")
);
const prismaService = new PrismaService();
const queue = queueFactory.kafka(Env.get<string>("KAFKA_BROKER_ADDRESS"));
new QueueHandler(queue);
const server = serversFactory.express();
const { itemRepository, userRepository, orderRepository } =
	dbFactory.postgres(prismaService);
// -------------- USE CASES --------------
const createUserUseCase = new CreateUserUseCase(userRepository);
const signUpUseCase = new SignInUseCase(userRepository, tokenGenerator);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const createItemUseCase = new CreateItemUseCase(itemRepository, userRepository);
const findAllItemsUseCase = new FindAllItemsUseCase(itemRepository);
const findPendingItemsUseCase = new FindPendingItemsUseCase(itemRepository);
const findActiveItemsUseCase = new FindActiveItemsUseCase(itemRepository);
const findInactiveItemsUseCase = new FindInactiveItemsUseCase(itemRepository);
const findItemUseCase = new FindItemUseCase(itemRepository);
const deleteItemUseCase = new DeleteItemUseCase(itemRepository);
const activeItemUseCase = new ActiveItemUseCase(itemRepository);
const createOrderUseCase = new CreateOrderUseCase(
	orderRepository,
	itemRepository,
	userRepository,
	queue
);
// -------------- HANDLERS --------------
const signUpHandler = new SignUpHandler(createUserUseCase);
const signInHandler = new SignInHandler(signUpUseCase);
const findAllUsersHandler = new FindAllUsersHandler(findAllUsersUseCase);
const findUserHandler = new FindUserHandler(findUserUseCase);
const deleteUserHandler = new DeleteUserHandler(deleteUserUseCase);
const createItemHandler = new CreateItemHandler(createItemUseCase);
const findAllItemsHandler = new FindAllItemsHandler(findAllItemsUseCase);
const findPendingItemsHandler = new FindPendingItemsHandler(
	findPendingItemsUseCase
);
const findActiveItemsHandler = new FindActiveItemsHandler(
	findActiveItemsUseCase
);
const findInactiveItemsHandler = new FindInactiveItemsHandler(
	findInactiveItemsUseCase
);
const findItemHandler = new FindItemHandler(findItemUseCase);
const deleteItemHandler = new DeleteItemHandler(deleteItemUseCase);
const activeItemHandler = new ActiveItemHandler(activeItemUseCase);
const createOrderHandler = new CreateOrderHandler(createOrderUseCase);
// -------------- MIDDLEWARES --------------
const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(
	tokenGenerator,
	userRepository
);
const loggedUserIsTargetUserMiddleware = new LoggedUserIsTargetUserMiddleware();
const loggedUserIsTargetUserItemMiddleware =
	new LoggedUserIsTargetUserItemMiddleware(itemRepository);
const isAdminMiddleware = new IsAdminMiddleware(userRepository);
const isActiveItemOrUserIsItemOwner =
	new IsActiveItemOrUserIsItemOwnerMiddleware(
		itemRepository,
		userRepository,
		tokenGenerator
	);
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
server.register(
	"get",
	"/items",
	findAllItemsHandler,
	isAuthenticatedMiddleware,
	isAdminMiddleware
);
server.register(
	"get",
	"/items/pending",
	findPendingItemsHandler,
	isAuthenticatedMiddleware,
	isAdminMiddleware
);
server.register("get", "/items/active", findActiveItemsHandler);
server.register(
	"get",
	"/items/inactive",
	findInactiveItemsHandler,
	isAuthenticatedMiddleware,
	isAdminMiddleware
);
server.register(
	"get",
	"/items/:id",
	findItemHandler,
	isActiveItemOrUserIsItemOwner
);
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
server.register(
	"post",
	"/orders",
	createOrderHandler,
	isAuthenticatedMiddleware
);

// -------------- MAIN --------------
async function main() {
	await server.start(Env.get("PORT"));
}

main()
	.then(async () => {
		await queue.connect();
		await prismaService.connect();
	})
	.catch(async (err) => {
		console.error(err);
		await queue.disconnect();
		await prismaService.disconnect();
	});
