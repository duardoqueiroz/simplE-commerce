export interface HttpResponse<T = unknown> {
	body: T;
	statusCode: number;
}
