import KafkaService from "../../../infra/queue/kafka-service";

class QueueFactory {
	constructor() {}

	public kafka(broker_address: string) {
		return new KafkaService(broker_address);
	}
}

export default new QueueFactory();
