export type CreateOrderRequestDto = {
	user_id: string;
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
