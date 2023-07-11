import { HttpResponse } from "../../../application/ports/http-responses/http-response";
import { HttpResponseHandler } from "../../../application/ports/http-responses/http-response-handler";

export class UpdatedResponse<T> implements HttpResponseHandler<T> {
	async response(body: T): Promise<HttpResponse<T>> {
		const responseData = {
			statusCode: 204,
			body,
		};

		return responseData;
	}
}
