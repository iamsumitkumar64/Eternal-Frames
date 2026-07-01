import { Module } from "@nestjs/common";
import { GetSubscriptionPlanListingController } from "./get-subscription-plan-listing.controller";
import { GetSubscriptionPlanListingService } from "./get-subscription-plan-listing.handler";
import { SubscriptionPlanRepository } from "src/module/billing-module/infrastructure/repository/subscription-plan.repository";

@Module({
    imports: [],
    controllers: [GetSubscriptionPlanListingController],
    providers: [GetSubscriptionPlanListingService, SubscriptionPlanRepository],
    exports: [],
})

export class GetSubscriptionPlanListingModule { }