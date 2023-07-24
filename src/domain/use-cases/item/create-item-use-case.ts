import { CreateItemRequestDto } from "../../../application/dtos/item/create-item-dtos/create-item-input-dto";
import { CreateItemResponseDto } from "../../../application/dtos/item/create-item-dtos/create-item-output-dto";

export default interface ICreateItemUseCase {
	execute(data: CreateItemRequestDto): Promise<CreateItemResponseDto>;
}
