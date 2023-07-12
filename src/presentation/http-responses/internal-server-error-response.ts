import { HttpResponse } from "../../ports/http/http-response";

export default class InternalServerErrorResponse<T> implements HttpResponse<T> {
	statusCode = 500;

	constructor(readonly body: T) {}
}
