export default class PaymentRefusedEvent {
	constructor(
		readonly order_id: string,
		readonly user_id: string,
		readonly transaction_id: string,
		readonly reasons: string[]
	) {}
}
