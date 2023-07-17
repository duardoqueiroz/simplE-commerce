import { left, right } from "../../../../helpers/Either";
import ItemNotFoundError from "../../../../presentation/errors/application/item-not-found-error";
import { FindItemResponseDto } from "../../dtos/find-item-dtos/find-item-response-dto";
import IItemRepository from "../../repositories/contracts/item-repository";
import IFindItemUseCase from "../contracts/find-item-use-case";

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
