import { Either } from "../../../common/helpers/Either";
import PaymentFailedError from "../../errors/application/payment-failed-error";

type TransactionData = {
	id: string;
	status: string;
	metadata: any;
};

export type PaymentResponse = Either<PaymentFailedError, TransactionData>;
