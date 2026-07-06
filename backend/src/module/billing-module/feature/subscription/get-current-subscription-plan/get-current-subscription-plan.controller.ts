import { Controller, Get, Req } from "@nestjs/common";
import { GetCurrentSubscriptionPlanService } from "./get-current-subscription-plan.handler";
import type { Request } from "express";

@Controller()
export class GetCurrentSubscriptionPlanController {
    constructor(private readonly getCurrentSubscriptionPlanService: GetCurrentSubscriptionPlanService) { }

    @Get('plan')
    async getCurrentSubscriptionPlan(@Req() req: Request) {
        const { data } = await this.getCurrentSubscriptionPlanService.handle(req);

        return {
            data: data,
            message: "Subscription Plan Fetched Success"
        }
    }
}