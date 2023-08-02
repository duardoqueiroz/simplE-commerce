import Queue from "../../../application/contracts/queue/queue";
import { Connection, connect } from "amqplib";

export default class RabbitMqService implements Queue {
	private connection: Connection = {} as Connection;

	constructor(private readonly host: string) {}

	public async connect(): Promise<void> {
		this.connection = await connect(this.host);
	}

	public async disconnect(): Promise<void> {
		if (this.connectionIsNotInitialized()) {
			return;
		}
		this.connection.close();
	}

	public async on(event: string, callback: Function): Promise<void> {
		if (this.connectionIsNotInitialized()) {
			throw new Error("RabbitMq Connection not initialized");
		}
		const channel = await this.connection.createChannel();
		await channel.assertQueue(event, { durable: true });
		channel.consume(event, async (msg) => {
			const input = JSON.parse(msg!.content.toString());
			await callback(input);
			channel.ack(msg!);
		});
	}

	public async emit(event: string, data: any): Promise<void> {
		if (this.connectionIsNotInitialized()) {
			throw new Error("RabbitMq Connection not initialized");
		}
		const channel = await this.connection.createChannel();
		await channel.assertQueue(event, { durable: true });
		channel.sendToQueue(event, Buffer.from(JSON.stringify(data)));
	}

	private connectionIsNotInitialized(): boolean {
		return this.connection === ({} as Connection);
	}
}
