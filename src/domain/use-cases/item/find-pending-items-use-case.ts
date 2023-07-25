import { FindAllItemsResponseDto } from "../../../application/dtos/item/find-all-items-dtos/find-all-items-response-dto";

export default interface IFindPendingItemsUseCase {
	execute(): Promise<FindAllItemsResponseDto>;
}
