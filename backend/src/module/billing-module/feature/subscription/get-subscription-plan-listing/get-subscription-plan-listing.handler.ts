import { BadRequestException, Injectable } from "@nestjs/common";
import { SubscriptionPlanRepository } from "src/module/billing-module/infrastructure/repository/subscription-plan.repository";

@Injectable()
export class GetSubscriptionPlanListingService {
    constructor(
        private readonly repository: SubscriptionPlanRepository,
    ) { }

    async handle(offset?: number, limit?: number) {
        const { data, total } = await this.repository.getSubscriptionPlanListing(offset, limit);

        return {
            data: data,
            totalDocuments: total,
        }
    }
}