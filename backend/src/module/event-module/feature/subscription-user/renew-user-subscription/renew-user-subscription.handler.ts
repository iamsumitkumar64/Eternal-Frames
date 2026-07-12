import { BadRequestException, Injectable } from "@nestjs/common";
import type { SubscriptionUserRenewedMQEventPayload } from "src/module/event-module/infrastructure/rabbit-mq/rabbit-mq.type";
import { SubscriptionUserRepository } from "src/module/event-module/infrastructure/repository/subscription-user.repository";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class RenewUserSubscriptionPlanService {
    constructor(
        private readonly subscriptionUserRepository: SubscriptionUserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(payload: SubscriptionUserRenewedMQEventPayload) {
        const isActivePlanExists = await this.subscriptionUserRepository.findByUserUuid(payload.user_uuid);
        if (!isActivePlanExists) {
            throw new BadRequestException("You have No Active Plan right now");
        }

        await this.subscriptionUserRepository.deleteSubscriptionUser(isActivePlanExists.uuid);
        await this.subscriptionUserRepository.createSubscriptionUser(payload);

        return;
    }
}