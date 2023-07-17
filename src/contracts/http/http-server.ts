import HttpHandler from "./http-handler";
import HttpMiddleware from "./http-middleware";

export default interface HttpServer {
	register(
		method: "get" | "post",
		path: string,
		handler: HttpHandler,
		...middlewares: HttpMiddleware[]
	): Promise<void>;
	start(port: number): Promise<void>;
}
