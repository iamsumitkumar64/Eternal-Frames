import { BadRequestException, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";

@Injectable()
export class GetCurrentSubscriptionPlanService {
    constructor(
        private readonly repository: SubscriptionUserRepository,
    ) { }

    async handle(req: Request) {
        const data = await this.repository.getCurrentSubscriptionPlan(req.user.uuid);

        return {
            data: data,
        }
    }
}