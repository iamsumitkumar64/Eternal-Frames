import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventImageDto } from "./create-event-image.dto";
import type { Request } from "express";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { Transactional } from "typeorm-transactional";
import { TagRepository } from "src/module/event-module/infrastructure/repository/tag.repository";
import { EventImageRepository } from "src/module/event-module/infrastructure/repository/event-image.repository";

@Injectable()
export class CreateEventImageService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly tagRepository: TagRepository,
        private readonly eventImageRepository: EventImageRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(req: Request, body: CreateEventImageDto) {
        const isEventExists = await this.eventRepository.findByUuid(body.event_uuid);
        if (!isEventExists) {
            throw new BadRequestException("Event Not Found");
        }

        let tag = await this.tagRepository.findByTagName(body.tag_name);
        if (!tag) {
            tag = await this.tagRepository.createTag({ tag_name: body.tag_name });
        }

        await this.eventImageRepository.createEventImage({
            tag_uuid: tag.uuid,
            image_url: body.image_url,
            event_uuid: body.event_uuid,
        });

        return await this.eventRepository.findByUuid(body.event_uuid);
    }
}
