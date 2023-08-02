export default class OrderCreatedEvent {
	constructor(
		readonly order_id: string,
		readonly user_id: string,
		readonly amount: number,
		readonly credit_card_token: string
	) {}
}
