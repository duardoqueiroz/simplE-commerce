import IItemRepository from "../../../domain/repositories/item-repository";
import IOrderRepository from "../../../domain/repositories/order-repository";
import IUserRepository from "../../../domain/repositories/user-repository";

export default interface IRepositoryFactory {
	userRepository: IUserRepository;
	itemRepository: IItemRepository;
	orderRepository: IOrderRepository;
}
