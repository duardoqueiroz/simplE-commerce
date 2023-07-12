import HttpHandler from "../http-handlers/http-handler";

export default interface HttpServer {
	register(
		method: "get" | "post",
		path: string,
		handler: HttpHandler
	): Promise<void>;
	start(port: number): Promise<void>;
}
