import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EventEntity } from "../../domain/event/event.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class EventRepository extends Repository<EventEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema')
        private readonly dataSource: DataSource,
    ) {
        super(EventEntity, dataSource.createEntityManager());
    }

    async createEvent(body: Partial<EventEntity>) {
        const event = this.create(body);
        return await this.save(event);
    }

    async findByUuid(uuid: string) {
        const event = await this.findOne({
            where: {
                uuid: uuid
            },
            relations: {
                images: {
                    tag: true,
                },
            },
        });
        return event;
    }

    async getEventsByStudio(studio_uuid: string, offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            where: {
                user_uuid: studio_uuid,
            },
            relations: {
                images: {
                    tag: true,
                },
            },
            order: {
                created_at: "DESC",
            },
            skip: offset || Number(process.env.page_offset) || 0,
            take: limit || Number(process.env.page_limit) || 10,
        });

        return { data, total };
    }

    async deleteEvent(uuid: string) {
        await this.softDelete(uuid);
        return;
    }
}
