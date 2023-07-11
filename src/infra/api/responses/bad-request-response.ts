import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export default class BadRequestResponse<T> implements HttpResponse<T> {
	statusCode = 400;

	constructor(readonly body: T) {}
}
