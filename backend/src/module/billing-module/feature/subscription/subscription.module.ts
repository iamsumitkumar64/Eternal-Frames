import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetSubscriptionPlanListingModule } from "./get-subscription-plan-listing/get-subscription-plan-listing.module";
import { UserBoughtSubscriptionPlanModule } from "./user-bought-subscription-plan/user-bought-subscription-plan.module";
import { GetCurrentSubscriptionPlanModule } from "./get-current-subscription-plan/get-current-subscription-plan.module";
import { CancelUserSubscriptionPlanModule } from "./cancel-user-subscription/cancel-user-subscription.module";
import { RenewUserSubscriptionPlanModule } from "./renew-user-subscription/renew-user-subscription.module";

@Module({
    imports: [
        GetSubscriptionPlanListingModule,
        UserBoughtSubscriptionPlanModule,
        GetCurrentSubscriptionPlanModule,
        CancelUserSubscriptionPlanModule,
        RenewUserSubscriptionPlanModule,
        RouterModule.register([
            {
                path: 'subscription',
                children: [
                    { path: '', module: GetSubscriptionPlanListingModule },
                    { path: 'current', module: GetCurrentSubscriptionPlanModule },
                    { path: 'studio', module: UserBoughtSubscriptionPlanModule },
                    { path: '', module: CancelUserSubscriptionPlanModule },
                    { path: '', module: RenewUserSubscriptionPlanModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class SubscriptionModule { }