import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetSubscriptionPlanListingModule } from "./get-subscription-plan-listing/get-subscription-plan-listing.module";

@Module({
    imports: [
        GetSubscriptionPlanListingModule,
        RouterModule.register([
            {
                path: 'subscription',
                children: [
                    { path: '', module: GetSubscriptionPlanListingModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class SubscriptionModule { }