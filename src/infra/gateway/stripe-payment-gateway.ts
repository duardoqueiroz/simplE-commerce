import PaymentGateway from "../../application/contracts/gateway/payment-gateway";
import { Stripe } from "stripe";
import PaymentRequest from "../../application/contracts/gateway/payment-request";
import { PaymentResponse } from "../../application/contracts/gateway/payment-response";
import { left, right } from "../../common/helpers/Either";
import PaymentFailedError from "../../application/errors/application/payment-failed-error";
import logger from "../../main/logger";

export default class StripePaymentGateway implements PaymentGateway {
	private readonly stripe: Stripe;
	constructor(secretKey: string) {
		this.stripe = new Stripe(secretKey, {
			apiVersion: "2022-11-15",
		});
	}
	public async createTransaction(
		input: PaymentRequest
	): Promise<PaymentResponse> {
		try {
			logger.info("Creating transaction on Stripe");
			const payment = await this.stripe.paymentIntents.create({
				amount: input.amount,
				currency: "brl",
				payment_method_types: ["card"],
				payment_method: input.credit_card_token,
				confirm: true,
				metadata: input.metadata,
			});

			return right({
				id: payment.id,
				metadata: payment.metadata,
				status: payment.status === "succeeded" ? "approved" : payment.status,
			});
		} catch (error) {
			const err = error as Stripe.errors.StripeError;
			logger.error(`Error creating transaction on Stripe: ${err.message}`);
			return left(
				new PaymentFailedError(
					err.message,
					err.payment_intent?.id || err.requestId,
					err.type
				)
			);
		}
	}
}
