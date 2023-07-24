import { ActiveItemResponseDto } from "../../../application/dtos/item/active-item-dtos/active-item-response-dto";

export default interface IActiveItemUseCase {
	execute(id: string): Promise<ActiveItemResponseDto>;
}
