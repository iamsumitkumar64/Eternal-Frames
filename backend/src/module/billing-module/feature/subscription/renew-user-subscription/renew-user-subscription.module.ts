import { Module } from "@nestjs/common";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";
import { OutboxRepository } from "src/module/billing-module/infrastructure/repository/outbox.repository";
import { RenewUserSubscriptionPlanController } from "./renew-user-subscription.controller";
import { RenewUserSubscriptionPlanService } from "./renew-user-subscription.handler";

@Module({
    imports: [],
    controllers: [RenewUserSubscriptionPlanController],
    providers: [RenewUserSubscriptionPlanService, SubscriptionUserRepository, OutboxRepository],
    exports: [],
})

export class RenewUserSubscriptionPlanModule { }