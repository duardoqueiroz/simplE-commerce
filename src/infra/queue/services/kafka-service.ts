import { Consumer, Kafka, KafkaConfig, Producer } from "kafkajs";
import Queue from "../../../application/contracts/queue/queue";

export default class KafkaService implements Queue {
	producer: Producer;
	consumer: Consumer;

	constructor(broker_address: string) {
		const kafkaConfig: KafkaConfig = {
			brokers: [broker_address],
			clientId: "api",
		};
		const kafka = new Kafka(kafkaConfig);
		this.producer = kafka.producer();
		this.consumer = kafka.consumer({ groupId: "api" });
	}

	public async connect(): Promise<void> {
		await this.producer.connect();
		await this.consumer.connect();
	}

	public async disconnect(): Promise<void> {
		await this.producer.disconnect();
		await this.consumer.disconnect();
	}

	/*
		Doesn't work correctly
	*/
	public async on(event: string, callback: Function): Promise<void> {
		await this.consumer.subscribe({ topic: event, fromBeginning: true });
		await this.consumer.run({
			eachMessage: async ({ message }) => {
				const data = JSON.parse(message.value!.toString());
				await callback(data);
			},
		});
	}

	public async emit(event: string, data: any): Promise<void> {
		await this.producer.send({
			topic: event,
			messages: [{ value: JSON.stringify(data) }],
		});
	}
}
