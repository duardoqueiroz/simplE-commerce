import jsonwebtoken from "jsonwebtoken";

export default class TokenGenerator {
	constructor(
		private readonly secretKey: string,
		private readonly expiresIn: number
	) {}

	public generate(value: { [key: string]: string }) {
		const expiresIn = this.expiresIn;
		return {
			value: jsonwebtoken.sign(
				{ value, iat: new Date().getTime(), expiresIn },
				this.secretKey
			),
			expires_in: expiresIn,
		};
	}

	public verify(token: string): any {
		return jsonwebtoken.verify(token, this.secretKey);
	}
}
