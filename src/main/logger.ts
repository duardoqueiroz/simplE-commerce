import pino from "pino";

class Logger {
	public logger: pino.Logger;

	public constructor() {
		this.logger = pino({});
	}
}

export default new Logger().logger;
