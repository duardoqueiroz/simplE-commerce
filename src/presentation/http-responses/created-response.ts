import { HttpResponse } from "../../contracts/http/http-response";

export class CreatedResponse<T> implements HttpResponse<T> {
	statusCode = 201;

	constructor(readonly body: T) {}
}
