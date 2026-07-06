import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";
import { UpdateUserDto } from "./update-user.dto";
import type{ Request } from "express";
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

        if (body.email) {
            const existingUser = await this.userRepository.findByEmail(body.email);
            if (existingUser && existingUser.uuid !== userUuid) {
                throw new BadRequestException("Email is already in use by another account");
            }
        }

        await this.userRepository.update({ uuid: userUuid }, {
            name: body.name,
            email: body.email
        });

        const updatedUser = await this.userRepository.findByUuid(userUuid);

        await this.outboxRepository.createOutboxEntry({
            exchange_name: this.USER_EXCHANGE,
            routing_key: '',
            event_name: UserPublishEventEnum.USER_UPDATED,
            message_payload: updatedUser,
        });

        return updatedUser;
    }
}