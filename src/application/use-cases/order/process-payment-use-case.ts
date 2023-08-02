import { Right } from "../../../common/helpers/Either";
import PaymentApprovedEvent from "../../../domain/events/payment-approved-event";
import PaymentRefusedEvent from "../../../domain/events/payment-refused-event";
import IProcessPaymentUseCase from "../../../domain/use-cases/order/process-payment-use-case";
import PaymentGateway from "../../contracts/gateway/payment-gateway";
import Queue from "../../contracts/queue/queue";
import { ProcessPaymentRequestDto } from "../../dtos/order/process-payment-dtos/process-payment-request-dto";

export default class ProcessPaymentUseCase implements IProcessPaymentUseCase {
	constructor(
		private readonly paymentGateway: PaymentGateway,
		private readonly queueService: Queue
	) {}

	public async execute(input: ProcessPaymentRequestDto): Promise<undefined> {
		const { order_id, user_id, amount, credit_card_token } = input;

		const payment = await this.paymentGateway.createTransaction({
			amount,
			credit_card_token,
			metadata: {
				order_id,
				user_id,
			},
		});
		if (payment.isLeft()) {
			const paymentRefusedEvent = new PaymentRefusedEvent(
				order_id,
				user_id,
				payment.value.transactionId,
				payment.value.messages
			);
			await this.queueService.emit("PAYMENT_REFUSED", paymentRefusedEvent);
			return;
		}
		if (payment.value.status === "approved") {
			const orderPaidEvent = new PaymentApprovedEvent(
				payment.value.metadata.order_id,
				payment.value.metadata.user_id,
				payment.value.id
			);
			await this.queueService.emit("PAYMENT_APPROVED", orderPaidEvent);
		}
	}
}
