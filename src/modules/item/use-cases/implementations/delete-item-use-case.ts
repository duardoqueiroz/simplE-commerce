import { left, right } from "../../../../helpers/Either";
import ItemNotFoundError from "../../../../presentation/errors/application/item-not-found-error";
import { DeleteItemResponseDto } from "../../dtos/delete-item-dtos/delete-item-response-dto";
import IItemRepository from "../../repositories/contracts/item-repository";
import IDeleteItemUseCase from "../contracts/delete-item-use-case";

export default class DeleteItemUseCase implements IDeleteItemUseCase {
	constructor(private readonly itemRepository: IItemRepository) {}

	public async execute(itemId: string): Promise<DeleteItemResponseDto> {
		const item = await this.itemRepository.findById(itemId);
		if (!item) {
			return left(new ItemNotFoundError());
		}
		await this.itemRepository.delete(itemId);
		return right(undefined);
	}
}
