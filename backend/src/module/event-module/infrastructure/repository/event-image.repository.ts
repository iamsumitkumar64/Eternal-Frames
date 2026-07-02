import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { EventImageEntity } from "../../domain/event_image/event_image.entity";

@Injectable()
export class EventImageRepository extends Repository<EventImageEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema')
        private readonly dataSource: DataSource,
    ) {
        super(EventImageEntity, dataSource.createEntityManager());
    }

    async createEventImage(body: Partial<EventImageEntity>) {
        const event_image = this.create(body);
        return await this.save(event_image);
    }

    async findByUuid(uuid: string) {
        const event_image = await this.findOne({
            where: {
                uuid: uuid
            }
        });
        return event_image;
    }

    async deleteEventImage(uuid: string) {
        await this.softDelete(uuid);
        return;
    }
}
