import ExpressServer from "../../../infra/servers/express-server";

class ServersFactory {
	constructor() {}

	public express() {
		return new ExpressServer();
	}
}

export default new ServersFactory();
