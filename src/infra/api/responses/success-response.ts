import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export class SuccessResponse<T> implements HttpResponse<T> {
	statusCode = 200;

	constructor(readonly body: T) {}
}
