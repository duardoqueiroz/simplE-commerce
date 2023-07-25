import { right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IFindInactiveItemsUseCase from "../../../domain/use-cases/item/find-inactive-items-use-case";
import { FindInactiveItemsResponseDto } from "../../dtos/item/find-inactive-items-dtos/find-inactive-items-response-dto";

export default class FindInactiveItemsUseCase
	implements IFindInactiveItemsUseCase
{
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(): Promise<FindInactiveItemsResponseDto> {
		const items = await this.itemRepository.findInactive();
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
