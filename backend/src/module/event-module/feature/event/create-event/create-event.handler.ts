import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import type { Request } from "express";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { Transactional } from "typeorm-transactional";
import { UserRepository } from "src/module/event-module/infrastructure/repository/user.repository";
import { UserRoleEnum } from "src/module/event-module/domain/user/user.enum";

@Injectable()
export class CreateEventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly userRepository: UserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(req: Request, body: CreateEventDto) {
        const isStudioExists = await this.userRepository.findByUuid(req.user.uuid);
        if (!isStudioExists) {
            throw new BadRequestException("Studio Not Found");
        }
        else if (isStudioExists.role != UserRoleEnum.STUDIO) {
            throw new BadRequestException("Registered as Customer, Not Studio");
        }

        const createdEvent = await this.eventRepository.createEvent({
            ...body,
            user_uuid: req.user.uuid,
        });

        return createdEvent;
    }
}
