import { Injectable } from "@nestjs/common";
import type { SubscriptionUserCreatedMQEventPayload } from "src/module/event-module/infrastructure/rabbit-mq/rabbit-mq.type";
import { SubscriptionUserRepository } from "src/module/event-module/infrastructure/repository/subscription-user.repository";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class RegisterSubscriptionUserService {
    constructor(
        private readonly repository: SubscriptionUserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(payload: SubscriptionUserCreatedMQEventPayload) {
        const isSubExists = await this.repository.findByUuid(payload.uuid);
        if (isSubExists) {
            console.warn(`Duplicate skipped subscription_user: ${payload.uuid}`);
            return;
        }

        await this.repository.register(payload);
        return;
    }
}
