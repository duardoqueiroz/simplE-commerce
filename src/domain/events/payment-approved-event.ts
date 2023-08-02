export default class PaymentApprovedEvent {
	constructor(
		readonly order_id: string,
		readonly user_id: string,
		readonly transaction_id: string
	) {}
}
