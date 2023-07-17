import { DeleteItemResponseDto } from "../../dtos/delete-item-dtos/delete-item-response-dto";

export default interface IDeleteItemUseCase {
	execute(itemId: string): Promise<DeleteItemResponseDto>;
}
