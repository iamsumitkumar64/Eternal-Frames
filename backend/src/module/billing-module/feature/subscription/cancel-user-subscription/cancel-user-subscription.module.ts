import { Module } from "@nestjs/common";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";
import { OutboxRepository } from "src/module/billing-module/infrastructure/repository/outbox.repository";
import { CancelUserSubscriptionPlanController } from "./cancel-user-subscription.controller";
import { CancelUserSubscriptionPlanService } from "./cancel-user-subscription.handler";

@Module({
    imports: [],
    controllers: [CancelUserSubscriptionPlanController],
    providers: [CancelUserSubscriptionPlanService, SubscriptionUserRepository, OutboxRepository],
    exports: [],
})

export class CancelUserSubscriptionPlanModule { }