import { HttpResponse } from "../../ports/http/http-response";

export default class NotFoundResponse<T> implements HttpResponse<T> {
	statusCode = 404;

	constructor(readonly body: T) {}
}
