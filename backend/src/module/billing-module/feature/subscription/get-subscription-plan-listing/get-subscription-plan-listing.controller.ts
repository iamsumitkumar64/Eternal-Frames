import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { GetSubscriptionPlanListingService } from "./get-subscription-plan-listing.handler";

@Controller()
export class GetSubscriptionPlanListingController {
    constructor(private readonly getSubscriptionPlanListingService: GetSubscriptionPlanListingService) { }

    @Get('plan')
    async getSubscriptionPlanListing(@Query('offset') offset?: number, @Query('limit') limit?: number) {
        const curr_limit = limit ?? Number(process.env.page_limit) ?? 10;
        const curr_offset = offset ?? Number(process.env.page_offset) ?? 0;
        const { data, totalDocuments } = await this.getSubscriptionPlanListingService.handle(offset, limit);

        return {
            data: data,
            limit: curr_limit,
            offset: curr_offset,
            totalDocuments: totalDocuments,
            message: "Subscription Plan Listing Success"
        }
    }
}