import { right } from "../../../../helpers/Either";
import { FindAllItemsResponseDto } from "../../dtos/find-all-items-dtos/find-all-items-response-dto";
import IItemRepository from "../../repositories/contracts/item-repository";
import IFindAllItemsUseCase from "../contracts/find-all-items-use-case";

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
