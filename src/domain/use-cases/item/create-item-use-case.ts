import { CreateItemInputDto } from "../../../application/dtos/item/create-item-dtos/create-item-input-dto";
import { CreateItemOutputDto } from "../../../application/dtos/item/create-item-dtos/create-item-output-dto";

export default interface ICreateItemUseCase {
	execute(data: CreateItemInputDto): Promise<CreateItemOutputDto>;
}
