import { FindItemResponseDto } from "../../../application/dtos/item/find-item-dtos/find-item-response-dto";

export default interface IFindItemUseCase {
	execute(itemId: string): Promise<FindItemResponseDto>;
}
