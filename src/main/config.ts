class Env {
	private static instance: Env;
	private variables: { [key: string]: string | number | boolean };
	private requiredVariables: {
		[key: string]: "string" | "number" | "boolean";
	} = {
		JWT_SECRET: "string",
		JWT_EXPIRES_IN: "string",
		KAFKA_BROKER_ADDRESS: "string",
		CARD_ENCRYPTION_KEY: "string",
		CARD_ENCRYPTION_ALGORITHM: "string",
		CARD_ENCRYPTION_IV: "string",
	};

	private constructor() {
		this.variables = this.parseVariables(process.env);
	}

	private parseVariables(env: NodeJS.ProcessEnv): {
		[key: string]: string | number | boolean;
	} {
		const parsedVariables: { [key: string]: string | number | boolean } = {};

		for (const key in env) {
			const type = this.requiredVariables[key];
			if (type) {
				if (type === "number") {
					parsedVariables[key] = parseInt(env[key]!, 10);
				} else if (type === "boolean") {
					parsedVariables[key] = env[key]!.toLowerCase() === "true";
				} else {
					parsedVariables[key] = env[key]!;
				}
			} else {
				parsedVariables[key] = env[key]!;
			}
		}

		return parsedVariables;
	}

	public static getInstance(): Env {
		if (!Env.instance) {
			Env.instance = new Env();
		}
		return Env.instance;
	}

	public initialize(): void {
		for (const variable in this.requiredVariables) {
			if (!(variable in this.variables)) {
				throw new Error(`Environment variable ${variable} is missing`);
			}
		}
	}

	public get<T extends string | number | boolean>(key: string): T {
		const value = this.variables[key];
		if (!value) {
			throw new Error(`Environment variable ${key} is missing`);
		}
		return value as T;
	}
}

export default Env.getInstance();
