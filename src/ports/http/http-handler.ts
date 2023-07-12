import { HttpRequest } from "../http-requests/http-request";
import { HttpResponse } from "../http-responses/http-response";

export default interface HttpHandler<T = unknown> {
	handle(request: HttpRequest): Promise<HttpResponse<T>>;
}
