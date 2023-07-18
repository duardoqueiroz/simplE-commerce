import IItemRepository from "../../modules/item/repositories/contracts/item-repository";
import IUserRepository from "../../modules/user/repositories/contracts/user-repository";

export default interface IRepositoryFactory {
	userRepository: IUserRepository;
	itemRepository: IItemRepository;
}
