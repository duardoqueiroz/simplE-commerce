import { left, right } from "../../../common/helpers/Either";
import IItemRepository from "../../../domain/repositories/item-repository";
import IDeleteItemUseCase from "../../../domain/use-cases/item/delete-item-use-case";
import { DeleteItemResponseDto } from "../../dtos/item/delete-item-dtos/delete-item-response-dto";
import ItemNotFoundError from "../../errors/application/item-not-found-error";

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
