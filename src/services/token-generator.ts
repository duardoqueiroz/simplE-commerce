import jsonwebtoken from "jsonwebtoken";

export default class TokenGenerator {
	constructor(private readonly secretKey: string) {}

	public generate(
		value: { [key: string]: string },
		expiresIn: number,
		issueDate: Date
	) {
		return {
			value: jsonwebtoken.sign(
				{ value, iat: issueDate.getTime(), expiresIn },
				this.secretKey
			),
			expires_in: expiresIn,
		};
	}

	public verify(token: string): any {
		return jsonwebtoken.verify(token, this.secretKey);
	}
}
