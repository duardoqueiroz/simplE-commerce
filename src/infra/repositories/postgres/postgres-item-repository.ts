import { item_status, item_category } from "@prisma/client";
import PrismaService from "../../../common/services/prisma-service";
import Item from "../../../domain/entities/item/item";
import IItemRepository from "../../../domain/repositories/item-repository";

export default class PostgresItemRepository implements IItemRepository {
	constructor(private readonly prisma: PrismaService) {}

	public async create(item: Item): Promise<Item> {
		const createdItem = await this.prisma.items.create({
			data: {
				id: item.id,
				name: item.name,
				description: item.description,
				price: item.price,
				user_id: item.userId,
				status: item_status[item.status as keyof typeof item_status],
				category: item_category[item.category as keyof typeof item_category],
			},
		});
		return Item.buildExisting(
			createdItem.id,
			createdItem.user_id,
			createdItem.name,
			createdItem.description,
			createdItem.price,
			createdItem.category,
			createdItem.status
		);
	}
	public async findById(id: string): Promise<Item | undefined> {
		const item = await this.prisma.items.findFirst({
			where: {
				id,
			},
		});
		if (!item) {
			return undefined;
		}
		return Item.buildExisting(
			item.id,
			item.user_id,
			item.name,
			item.description,
			item.price,
			item.category,
			item.status
		);
	}

	public async findAll(): Promise<Item[]> {
		const items = await this.prisma.items.findMany();
		return items.map((item) => {
			return Item.buildExisting(
				item.id,
				item.user_id,
				item.name,
				item.description,
				item.price,
				item.category,
				item.status
			);
		});
	}

	public async update(item: Item): Promise<Item | undefined> {
		const updatedItem = await this.prisma.items.update({
			where: {
				id: item.id,
			},
			data: {
				name: item.name,
				description: item.description,
				price: item.price,
				status: item_status[item.status as keyof typeof item_status],
				category: item_category[item.category as keyof typeof item_category],
			},
		});
		return Item.buildExisting(
			updatedItem.id,
			updatedItem.user_id,
			updatedItem.name,
			updatedItem.description,
			updatedItem.price,
			updatedItem.category,
			updatedItem.status
		);
	}

	public async delete(id: string): Promise<void> {
		await this.prisma.items.delete({
			where: {
				id,
			},
		});
	}
}
