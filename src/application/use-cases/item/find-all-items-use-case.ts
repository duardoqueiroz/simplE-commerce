import { right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IFindAllItemsUseCase from "../../../domain/use-cases/item/find-all-items-use-case";
import { FindAllItemsResponseDto } from "../../dtos/item/find-all-items-dtos/find-all-items-response-dto";

export default class FindAllItemsUseCase implements IFindAllItemsUseCase {
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(): Promise<FindAllItemsResponseDto> {
		const items = await this.itemRepository.findAll();
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
