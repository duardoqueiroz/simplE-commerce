import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export default class NotFoundResponse<T> implements HttpResponse<T> {
	statusCode = 404;

	constructor(readonly body: T) {}
}
