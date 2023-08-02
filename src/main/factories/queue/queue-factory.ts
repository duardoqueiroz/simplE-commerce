// import KafkaService from "../../../infra/queue/services/kafka-service";
import RabbitMqService from "../../../infra/queue/services/rabbitmq-service";

class QueueFactory {
	constructor() {}

	// public kafka(broker_address: string) {
	// 	return new KafkaService(broker_address);
	// }

	public rabbitmq(host: string) {
		return new RabbitMqService(host);
	}
}

export default new QueueFactory();
