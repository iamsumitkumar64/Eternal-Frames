import { BadRequestException, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { EventImageRepository } from "src/module/event-module/infrastructure/repository/event-image.repository";
import { UserRoleEnum } from "src/module/user-module/domain/user/user.enum";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";

@Injectable()
export class DeleteEventImageService {
    constructor(
        private readonly eventImageRepository: EventImageRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async handle(req: Request, event_image_uuid: string) {
        const isStudioExists = await this.userRepository.findByUuid(req.user.uuid);
        if (!isStudioExists) {
            throw new BadRequestException("Studio Not Found");
        }
        else if (isStudioExists.role != UserRoleEnum.STUDIO) {
            throw new BadRequestException("only Studio can delete event image");
        }

        await this.eventImageRepository.deleteEventImage(event_image_uuid);

        return;
    }
}