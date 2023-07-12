import express, { Application, Response, Request } from "express";
import HttpHandler from "../../ports/http/http-handler";
import HttpServer from "../../ports/http/http-server";

export default class ExpressServer implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	public async register(
		method: "get" | "post",
		path: string,
		handler: HttpHandler
	): Promise<void> {
		this.app[method](path, async (req: Request, res: Response) => {
			const request = {
				body: req.body,
				params: req.params,
				query: req.query,
				headers: req.headers,
			};
			const httpResponse = await handler.handle(request);
			return res.status(httpResponse.statusCode).json(httpResponse.body);
		});
	}

	public async start(port: number): Promise<void> {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
