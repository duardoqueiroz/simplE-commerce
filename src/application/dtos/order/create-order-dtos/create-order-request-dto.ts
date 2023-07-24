export type CreateOrderRequestDto = {
	userId: string;
	items: {
		item_id: string;
		quantity: number;
	}[];
	card: {
		number: string;
		name: string;
		cvv: string;
		expiration_date: string;
	};
};
