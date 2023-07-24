import { HttpResponse } from "../../contracts/http/http-response";

export class NoContentResponse implements HttpResponse {
	statusCode = 204;
	body: unknown;

	constructor() {}
}
