export type CreateOrderRequestDto = {
	user_id: string;
	items: {
		item_id: string;
		quantity: number;
	}[];
	credit_card_token: string;
};
