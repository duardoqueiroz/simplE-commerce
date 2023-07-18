import { left, right } from "../../../../helpers/Either";
import ItemNotFoundError from "../../../../presentation/errors/application/item-not-found-error";
import { ActiveItemResponseDto } from "../../dtos/active-item-dtos/active-item-response-dto";
import IItemRepository from "../../repositories/contracts/item-repository";
import IActiveItemUseCase from "../contracts/active-item-use-case";

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
