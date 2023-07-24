import { left, right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IFindItemUseCase from "../../../domain/use-cases/item/find-item-use-case";
import { FindItemResponseDto } from "../../dtos/item/find-item-dtos/find-item-response-dto";
import ItemNotFoundError from "../../errors/application/item-not-found-error";

export default class FindItemUseCase implements IFindItemUseCase {
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(itemId: string): Promise<FindItemResponseDto> {
		const item = await this.itemRepository.findById(itemId);
		if (!item) {
			return left(new ItemNotFoundError());
		}
		return right({
			id: item.id,
			user_id: item.userId,
			name: item.name,
			price: item.price,
			description: item.description,
			category: item.category,
			status: item.status,
		});
	}
}
