import { BadRequestException, Injectable } from "@nestjs/common";
import { UserBoughtSubscriptionPlanDto } from "./user-bought-subscription-plan.dto";
import type { Request } from "express";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";
import { OutboxRepository } from "src/module/billing-module/infrastructure/repository/outbox.repository";
import { Transactional } from "typeorm-transactional";
import { SubscriptionUserPublishEventEnum } from "src/module/billing-module/domain/subscription_user/subscription_user.event";

@Injectable()
export class UserBoughtSubscriptionPlanService {
    private BILLING_EXCHANGE = 'billing.exchange';

    constructor(
        private readonly subscriptionUserRepository: SubscriptionUserRepository,
        private readonly outboxRepository: OutboxRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
    })
    async handle(req: Request, body: UserBoughtSubscriptionPlanDto) {
        const isActivePlanExists = await this.subscriptionUserRepository.findByUserUuid(req.user.uuid);
        if (isActivePlanExists) {
            throw new BadRequestException("You have Active Plan right now");
        }

        const subscription = await this.subscriptionUserRepository.createSubscriptionUser({ ...body, user_uuid: req.user.uuid });

        await this.outboxRepository.createOutboxEntry({
            exchange_name: this.BILLING_EXCHANGE,
            routing_key: '',
            event_name: SubscriptionUserPublishEventEnum.SUBSCRIPTION_USER_CREATED,
            message_payload: subscription,
        });

        return;
    }
}