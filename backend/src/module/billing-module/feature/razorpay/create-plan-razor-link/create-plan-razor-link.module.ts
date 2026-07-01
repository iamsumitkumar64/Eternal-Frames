import { Module } from "@nestjs/common";
import { CreatePlanRazorLinkController } from "./create-plan-razor-link.controller";
import { CreatePlanRazorLinkService } from "./create-plan-razor-link.handler";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";

@Module({
    imports: [],
    controllers: [CreatePlanRazorLinkController],
    providers: [CreatePlanRazorLinkService, SubscriptionUserRepository],
    exports: [],
})
export class CreatePlanRazorLinkModule { }
