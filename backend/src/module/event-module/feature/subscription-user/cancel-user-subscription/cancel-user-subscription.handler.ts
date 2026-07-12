import { BadRequestException, Injectable } from "@nestjs/common";
import type { SubscriptionUserCancelMQEventPayload } from "src/module/event-module/infrastructure/rabbit-mq/rabbit-mq.type";
import { SubscriptionUserRepository } from "src/module/event-module/infrastructure/repository/subscription-user.repository";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class CancelUserSubscriptionPlanService {

    constructor(
        private readonly repository: SubscriptionUserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async handle(body: SubscriptionUserCancelMQEventPayload) {
        const isActivePlanExists = await this.repository.findByUuid(body.uuid);
        if (!isActivePlanExists) {
            throw new BadRequestException("You have No Active Plan right now");
        }

        await this.repository.deleteSubscriptionUser(isActivePlanExists.uuid);
        return;
    }
}