import PaymentRequest from "./payment-request";
import { PaymentResponse } from "./payment-response";

export default interface PaymentGateway {
	createTransaction(input: PaymentRequest): Promise<PaymentResponse>;
}
