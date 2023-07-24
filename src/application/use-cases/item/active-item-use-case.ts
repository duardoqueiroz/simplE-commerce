import { left, right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IActiveItemUseCase from "../../../domain/use-cases/item/active-item-use-case";
import { ActiveItemResponseDto } from "../../dtos/item/active-item-dtos/active-item-response-dto";
import ItemNotFoundError from "../../errors/application/item-not-found-error";

export default class ActiveItemUseCase implements IActiveItemUseCase {
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(id: string): Promise<ActiveItemResponseDto> {
		const foundItem = await this.itemRepository.findById(id);
		if (!foundItem) {
			return left(new ItemNotFoundError());
		}
		foundItem.makeItemActive();
		const item = await this.itemRepository.update(foundItem);
		if (!item) {
			return left(new ItemNotFoundError());
		}
		return right({
			id: item.id,
			userId: item.userId,
			name: item.name,
			category: item.category,
			description: item.description,
			price: item.price,
			status: item.status,
		});
	}
}
