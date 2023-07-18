export const config = () => {
	const port = (process.env.PORT && +process.env.PORT) || 3000;
	const jwt_secret = process.env.JWT_SECRET;
	if (!jwt_secret) {
		throw new Error(
			"Missing JWT_SECRET env var. Set it and restart the server"
		);
	}
	const jwt_expires_in = process.env.JWT_EXPIRES_IN || "1d";
	return {
		env: {
			port,
			jwt_secret,
			jwt_expires_in,
		},
	};
};
