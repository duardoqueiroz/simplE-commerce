import { Either } from "../../../../common/helpers/Either";
import { OrderItem } from "../../../../domain/entities/order/order-items";
import DefaultApplicationError from "../../../errors/application/default-application-error";

type OrderData = {
	id: string;
	user_id: string;
	items: OrderItem[];
	price: number;
	status: string;
};

export type CreateOrderResponseDto = Either<DefaultApplicationError, OrderData>;
