import { right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IFindActiveItemsUseCase from "../../../domain/use-cases/item/find-active-items-use-case";
import { FindActiveItemsResponseDto } from "../../dtos/item/find-active-items-dtos/find-active-items-response-dto";

export default class FindActiveItemsUseCase implements IFindActiveItemsUseCase {
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(): Promise<FindActiveItemsResponseDto> {
		const items = await this.itemRepository.findActive();
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
