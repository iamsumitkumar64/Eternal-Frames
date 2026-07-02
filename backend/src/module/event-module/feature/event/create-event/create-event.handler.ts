import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import type { Request } from "express";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class CreateEventService {
    constructor(
        private readonly repository: EventRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(req: Request, body: CreateEventDto) {
        const createdEvent = await this.repository.createEvent({
            ...body,
            user_uuid: req.user.uuid,
        });

        return createdEvent;
    }
}
