import { HttpResponse } from "../../contracts/http/http-response";

export class SuccessResponse<T> implements HttpResponse<T> {
	statusCode = 200;

	constructor(readonly body: T) {}
}
