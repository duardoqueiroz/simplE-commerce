import { right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IFindPendingItemsUseCase from "../../../domain/use-cases/item/find-pending-items-use-case";
import { FindPendingItemsResponseDto } from "../../dtos/item/find-pending-items-dtos/find-pending-items-response-dto";

export default class FindPendingItemsUseCase
	implements IFindPendingItemsUseCase
{
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(): Promise<FindPendingItemsResponseDto> {
		const items = await this.itemRepository.findPending();
		return right(
			items.map((item) => {
				return {
					id: item.id,
					user_id: item.userId,
					name: item.name,
					description: item.description,
					price: item.price,
					category: item.category,
					status: item.status,
				};
			})
		);
	}
}
