import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserBoughtSubscriptionPlanService } from "./user-bought-subscription-plan.handler";
import { UserBoughtSubscriptionPlanDto } from "./user-bought-subscription-plan.dto";
import type { Request } from "express";

@Controller()
export class UserBoughtSubscriptionPlanController {
    constructor(private readonly userBoughtSubscriptionPlanService: UserBoughtSubscriptionPlanService) { }

    @Post()
    async userBoughtSubscriptionPlan(@Req() req: Request, @Body() body: UserBoughtSubscriptionPlanDto) {
        await this.userBoughtSubscriptionPlanService.handle(req, body);

        return {
            message: "User Plan Created Successfully"
        };
    }
}