import Queue from "../../application/contracts/queue/queue";
import OrderCreatedEvent from "../../domain/events/order-created-event";
import PaymentApprovedEvent from "../../domain/events/payment-approved-event";
import PaymentRefusedEvent from "../../domain/events/payment-refused-event";
import IApproveOrderUseCase from "../../domain/use-cases/order/approve-order-use-case";
import IProcessPaymentUseCase from "../../domain/use-cases/order/process-payment-use-case";
import IRefuseOrderUseCase from "../../domain/use-cases/order/refuse-order-use-case";

export default class QueueHandler {
	constructor(
		private readonly queue: Queue,
		readonly processPaymentUseCase: IProcessPaymentUseCase,
		readonly approveOrderUseCase: IApproveOrderUseCase,
		readonly refuseOrderUseCase: IRefuseOrderUseCase
	) {
		this.queue.on("ORDER_CREATED", async function (event: OrderCreatedEvent) {
			await processPaymentUseCase.execute({
				amount: event.amount,
				credit_card_token: event.credit_card_token,
				order_id: event.order_id,
				user_id: event.user_id,
			});
		});
		this.queue.on(
			"PAYMENT_APPROVED",
			async function (event: PaymentApprovedEvent) {
				await approveOrderUseCase.execute(event.order_id);
			}
		);
		this.queue.on(
			"PAYMENT_REFUSED",
			async function (event: PaymentRefusedEvent) {
				await refuseOrderUseCase.execute(event.order_id);
			}
		);
	}
}
