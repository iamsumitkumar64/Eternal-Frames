import { Body, Controller, Delete, Post, Put, Req } from "@nestjs/common";
import type { Request } from "express";
import { RenewUserSubscriptionPlanService } from "./renew-user-subscription.handler";

@Controller()
export class RenewUserSubscriptionPlanController {
    constructor(private readonly renewUserSubscriptionPlanService: RenewUserSubscriptionPlanService) { }

    @Put()
    async renewUserSubscriptionPlan(@Req() req: Request) {
        await this.renewUserSubscriptionPlanService.handle(req);

        return {
            message: "User Subscription renewled Successfully"
        };
    }
}