import { HttpResponse } from "../../../application/ports/http-responses/http-response";

export class NoContentResponse implements HttpResponse {
	statusCode = 204;
	body: unknown;

	constructor() {}
}
