import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export class CreatedResponse<T> implements HttpResponse<T> {
	statusCode = 201;

	constructor(readonly body: T) {}
}
