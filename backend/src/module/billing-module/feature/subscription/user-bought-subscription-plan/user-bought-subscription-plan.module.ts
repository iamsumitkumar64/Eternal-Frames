import { Module } from "@nestjs/common";
import { UserBoughtSubscriptionPlanController } from "./user-bought-subscription-plan.controller";
import { UserBoughtSubscriptionPlanService } from "./user-bought-subscription-plan.handler";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";
import { OutboxRepository } from "src/module/billing-module/infrastructure/repository/outbox.repository";

@Module({
    imports: [],
    controllers: [UserBoughtSubscriptionPlanController],
    providers: [UserBoughtSubscriptionPlanService, SubscriptionUserRepository, OutboxRepository],
    exports: [],
})

export class UserBoughtSubscriptionPlanModule { }