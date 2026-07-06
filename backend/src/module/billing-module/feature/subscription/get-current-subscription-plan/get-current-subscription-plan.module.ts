import { Module } from "@nestjs/common";
import { GetCurrentSubscriptionPlanController } from "./get-current-subscription-plan.controller";
import { GetCurrentSubscriptionPlanService } from "./get-current-subscription-plan.handler";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";

@Module({
    imports: [],
    controllers: [GetCurrentSubscriptionPlanController],
    providers: [GetCurrentSubscriptionPlanService, SubscriptionUserRepository],
    exports: [],
})

export class GetCurrentSubscriptionPlanModule { }