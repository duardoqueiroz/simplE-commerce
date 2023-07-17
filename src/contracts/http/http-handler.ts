import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export default interface HttpHandler<T = unknown> {
	handle(request: HttpRequest): Promise<HttpResponse<T>>;
}
