import { HttpResponse } from "./http-response";
import MiddlewareRequest from "./middleware-request";

export default interface HttpMiddleware {
	handle(
		request: MiddlewareRequest
	): Promise<HttpResponse<unknown> | undefined>;
}
