import { FindAllItemsResponseDto } from "../../dtos/find-all-items-dtos/find-all-items-response-dto";

export default interface IFindAllItemsUseCase {
	execute(): Promise<FindAllItemsResponseDto>;
}
