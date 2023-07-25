export default class OrderReservedEvent {
	constructor(
		readonly order_id: string,
		readonly user_id: string,
		readonly price: number,
		readonly credit_card_token: string
	) {}
}
