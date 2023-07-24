import express, { Application, Response, Request } from "express";
import HttpHandler from "../../../application/contracts/http/http-handler";
import HttpMiddleware from "../../../application/contracts/http/http-middleware";
import HttpServer from "../../../application/contracts/http/http-server";

export default class ExpressServer implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	public async register(
		method: "get" | "post" | "put" | "delete",
		path: string,
		handler: HttpHandler,
		...middlewares: HttpMiddleware[]
	): Promise<void> {
		const middlewareFunctions = middlewares.map((middleware) => {
			return async (req: Request, res: Response, next: Function) => {
				const httpResponse = await middleware.handle({
					body: req.body,
					params: req.params,
					query: req.query,
					headers: req.headers,
					method: req.method,
				});
				if (httpResponse) {
					return res.status(httpResponse.statusCode).json(httpResponse.body);
				}
				next();
			};
		});

		this.app[method](
			path,
			...middlewareFunctions,
			async (req: Request, res: Response) => {
				const request = {
					body: req.body,
					params: req.params,
					query: req.query,
					headers: req.headers,
				};
				const httpResponse = await handler.handle(request);
				return res.status(httpResponse.statusCode).json(httpResponse.body);
			}
		);
	}

	public async start(port: number): Promise<void> {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
