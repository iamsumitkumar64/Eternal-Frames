import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";
import { UpdateUserDto } from "./update-user.dto";
import type { Request } from "express";
import { OutboxRepository } from "src/module/user-module/infrastructure/repository/outbox.repository";
import { UserPublishEventEnum } from "src/module/user-module/domain/user/user.event";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class UpdateUserService {
    private readonly USER_EXCHANGE = 'user.exchange';

    constructor(
        private readonly userRepository: UserRepository,
        private readonly outboxRepository: OutboxRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema',
    })
    async handle(req: Request, body: UpdateUserDto) {
        const userUuid = req.user.uuid;
        const isUserExists = await this.userRepository.findByUuid(userUuid);
        if (!isUserExists) {
            throw new BadRequestException("User Not Found");
        }
        const isEmailAvailable = await this.userRepository.findByEmail(body.email);
        if (isEmailAvailable && isEmailAvailable.uuid === userUuid) {
            throw new BadRequestException("You already have this email");
        }
        if (isEmailAvailable) {
            throw new BadRequestException("Email is in use right now");
        }

        await this.userRepository.updateUser(userUuid, body);

        const updatedUser = await this.userRepository.findByUuid(userUuid);

        await this.outboxRepository.createOutboxEntry({
            exchange_name: this.USER_EXCHANGE,
            routing_key: '',
            event_name: UserPublishEventEnum.USER_UPDATED,
            message_payload: updatedUser || undefined,
        });

        return updatedUser;
    }
}