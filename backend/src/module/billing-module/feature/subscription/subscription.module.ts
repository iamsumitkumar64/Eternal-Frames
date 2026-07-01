import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetSubscriptionPlanListingModule } from "./get-subscription-plan-listing/get-subscription-plan-listing.module";
import { UserBoughtSubscriptionPlanModule } from "./user-bought-subscription-plan/user-bought-subscription-plan.module";

@Module({
    imports: [
        GetSubscriptionPlanListingModule,
        UserBoughtSubscriptionPlanModule,
        RouterModule.register([
            {
                path: 'subscription',
                children: [
                    { path: '', module: GetSubscriptionPlanListingModule },
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