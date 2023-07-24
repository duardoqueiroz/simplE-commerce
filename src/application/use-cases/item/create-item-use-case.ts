import { left, right } from "../../../common/helpers/Either";
import ErrorHandler from "../../../common/services/error-handler";
import Item from "../../../domain/entities/item/item";
import IItemRepository from "../../../domain/repositories/item-repository";
import IUserRepository from "../../../domain/repositories/user-repository";
import ICreateItemUseCase from "../../../domain/use-cases/item/create-item-use-case";
import { CreateItemInputDto } from "../../dtos/item/create-item-dtos/create-item-input-dto";
import { CreateItemOutputDto } from "../../dtos/item/create-item-dtos/create-item-output-dto";
import UserNotFoundError from "../../errors/application/user-not-found-error";

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
