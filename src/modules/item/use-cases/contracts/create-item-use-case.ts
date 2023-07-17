import { CreateItemInputDto } from "../../dtos/create-item-dtos/create-item-input-dto";
import { CreateItemOutputDto } from "../../dtos/create-item-dtos/create-item-output-dto";

export default interface ICreateItemUseCase {
	execute(data: CreateItemInputDto): Promise<CreateItemOutputDto>;
}
