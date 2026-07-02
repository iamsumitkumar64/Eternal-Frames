import { BadRequestException, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { UserRoleEnum } from "src/module/user-module/domain/user/user.enum";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";

@Injectable()
export class DeleteEventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async handle(req: Request, uuid: string) {
        const isStudioExists = await this.userRepository.findByUuid(req.user.uuid);
        if (!isStudioExists) {
            throw new BadRequestException("Studio Not Found");
        }
        else if (isStudioExists.role != UserRoleEnum.STUDIO) {
            throw new BadRequestException("only Studio can delete event");
        }

        await this.eventRepository.deleteEvent(uuid);

        return;
    }
}