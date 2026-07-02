import { Injectable } from "@nestjs/common";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class GetEventListingService {
    constructor(
        private readonly repository: EventRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(studioUuid: string, offset?: number, limit?: number) {
        const { data, total } = await this.repository.getEventsByStudio(studioUuid, offset, limit);
        return { data, totalDocuments: total };
    }
}
