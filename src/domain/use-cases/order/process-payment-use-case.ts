import { ProcessPaymentRequestDto } from "../../../application/dtos/order/process-payment-dtos/process-payment-request-dto";

export default interface IProcessPaymentUseCase {
	execute(input: ProcessPaymentRequestDto): Promise<undefined>;
}
