import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetSubscriptionPlanListingModule } from "./get-subscription-plan-listing/get-subscription-plan-listing.module";
import { UserBoughtSubscriptionPlanModule } from "./user-bought-subscription-plan/user-bought-subscription-plan.module";
import { GetCurrentSubscriptionPlanModule } from "./get-current-subscription-plan/get-current-subscription-plan.module";

@Module({
    imports: [
        GetSubscriptionPlanListingModule,
        UserBoughtSubscriptionPlanModule,
        GetCurrentSubscriptionPlanModule,
        RouterModule.register([
            {
                path: 'subscription',
                children: [
                    { path: '', module: GetSubscriptionPlanListingModule },
                    { path: 'current', module: GetCurrentSubscriptionPlanModule },
                    { path: 'studio', module: UserBoughtSubscriptionPlanModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class SubscriptionModule { }