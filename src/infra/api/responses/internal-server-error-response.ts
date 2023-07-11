import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export default class InternalServerErrorResponse<T> implements HttpResponse<T> {
	statusCode = 500;

	constructor(readonly body: T) {}
}
