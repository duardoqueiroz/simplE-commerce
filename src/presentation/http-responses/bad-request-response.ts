import { HttpResponse } from "../../ports/http/http-response";

export default class BadRequestResponse<T> implements HttpResponse<T> {
	statusCode = 400;

	constructor(readonly body: T) {}
}
