import { FindItemResponseDto } from "../../dtos/find-item-dtos/find-item-response-dto";

export default interface IFindItemUseCase {
	execute(itemId: string): Promise<FindItemResponseDto>;
}
