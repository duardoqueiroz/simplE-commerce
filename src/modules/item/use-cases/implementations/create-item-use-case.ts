import { left, right } from "../../../../helpers/Either";
import UserNotFoundError from "../../../../presentation/errors/application/user-not-found-error";
import ErrorHandler from "../../../../services/error-handler";
import IUserRepository from "../../../user/repositories/contracts/user-repository";
import { CreateItemInputDto } from "../../dtos/create-item-dtos/create-item-input-dto";
import { CreateItemOutputDto } from "../../dtos/create-item-dtos/create-item-output-dto";
import Item from "../../entities/item";
import IItemRepository from "../../repositories/contracts/item-repository";
import ICreateItemUseCase from "../contracts/create-item-use-case";

export default class CreateItemUseCase implements ICreateItemUseCase {
	constructor(
		private readonly itemRepository: IItemRepository,
		private readonly userRepository: IUserRepository
	) {}

	public async execute(data: CreateItemInputDto): Promise<CreateItemOutputDto> {
		const user = await this.userRepository.findById(data.userId);
		if (!user) {
			return left(new UserNotFoundError());
		}

		const itemEntity = Item.create(
			user.id,
			data.name,
			data.description,
			data.price,
			data.category
		);

		if (itemEntity.isLeft()) {
			return left(ErrorHandler.mapDomainErrorToUseCaseError(itemEntity.value));
		}

		const item = await this.itemRepository.create(itemEntity.value as Item);

		return right({
			id: item.id,
			userId: item.userId,
			name: item.name,
			description: item.description,
			category: item.category,
			price: item.price,
			status: item.status,
		});
	}
}
