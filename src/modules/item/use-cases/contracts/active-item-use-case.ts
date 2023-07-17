import { ActiveItemResponseDto } from "../../dtos/active-item-dtos/active-item-response-dto";

export default interface IActiveItemUseCase {
	execute(id: string): Promise<ActiveItemResponseDto>;
}
