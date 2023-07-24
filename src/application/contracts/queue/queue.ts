export default interface Queue {
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	on(event: string, callback: Function): Promise<void>;
	emit(event: string, data: any): Promise<void>;
}
