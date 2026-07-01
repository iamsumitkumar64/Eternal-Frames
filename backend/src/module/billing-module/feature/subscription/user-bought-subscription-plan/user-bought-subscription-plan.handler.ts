import { BadRequestException, Injectable } from "@nestjs/common";
import { UserBoughtSubscriptionPlanDto } from "./user-bought-subscription-plan.dto";
import type { Request } from "express";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";

@Injectable()
export class UserBoughtSubscriptionPlanService {

    constructor(
        private readonly repository: SubscriptionUserRepository,
    ) { }

    async handle(req: Request, body: UserBoughtSubscriptionPlanDto) {
        const isActivePlanExists = await this.repository.findByUserUuid(req.user.uuid);
        if (isActivePlanExists) {
            throw new BadRequestException("You have Active Plan right now");
        }

        await this.repository.createPlan({ ...body, user_uuid: req.user.uuid });

        return;
    }
}