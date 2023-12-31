export interface HttpRequest<
	Body = any,
	Params = Body,
	Query = Body,
	Headers = Body,
	Files = Body
> {
	body?: Body;
	params?: Params;
	query?: Query;
	headers?: Headers;
	files?: Files;
}
