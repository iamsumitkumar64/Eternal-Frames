import { Body, Controller, Delete, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import { CancelUserSubscriptionPlanService } from "./cancel-user-subscription.handler";

@Controller()
export class CancelUserSubscriptionPlanController {
    constructor(private readonly cancelUserSubscriptionPlanService: CancelUserSubscriptionPlanService) { }

    @Delete()
    async cancelUserSubscriptionPlan(@Req() req: Request) {
        await this.cancelUserSubscriptionPlanService.handle(req);

        return {
            message: "User Subscription cancelled Successfully"
        };
    }
}