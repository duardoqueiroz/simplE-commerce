export type ProcessPaymentRequestDto = {
	order_id: string;
	user_id: string;
	amount: number;
	credit_card_token: string;
};
