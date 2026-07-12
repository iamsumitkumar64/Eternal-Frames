import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import type { Request } from "express";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { UserRepository } from "src/module/event-module/infrastructure/repository/user.repository";
import { UserRoleEnum } from "src/module/event-module/domain/user/user.enum";
import { SubscriptionUserRepository } from "src/module/event-module/infrastructure/repository/subscription-user.repository";

@Injectable()
export class CreateEventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly userRepository: UserRepository,
        private readonly subscriptionUserRepository: SubscriptionUserRepository,
    ) { }

    async handle(req: Request, body: CreateEventDto) {
        const isStudioExists = await this.userRepository.findByUuid(req.user.uuid);
        if (!isStudioExists) {
            throw new BadRequestException("Studio Not Found");
        }
        else if (isStudioExists.role != UserRoleEnum.STUDIO) {
            throw new BadRequestException("Registered as Customer, Not Studio");
        }

        const isSubscriptionExists = await this.subscriptionUserRepository.findByStudioUuid(isStudioExists.uuid);
        if (!isSubscriptionExists) {
            throw new BadRequestException("Subscription not exists,Please buy Subscription");
        }

        const createdEvent = await this.eventRepository.createEvent({
            ...body,
            user_uuid: req.user.uuid,
        });

        return createdEvent;
    }
}
