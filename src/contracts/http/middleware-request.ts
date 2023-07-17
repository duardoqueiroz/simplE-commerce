import { HttpRequest } from "./http-request";

export default interface MiddlewareRequest extends HttpRequest {
	method?: string;
}
