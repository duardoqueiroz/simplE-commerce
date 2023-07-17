import { HttpResponse } from "../../contracts/http/http-response";

export default class UnauthorizedResponse<T> implements HttpResponse<T> {
	statusCode = 401;

	constructor(readonly body: T) {}
}
