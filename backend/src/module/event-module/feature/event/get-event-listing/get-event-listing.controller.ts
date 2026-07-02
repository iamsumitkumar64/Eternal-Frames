import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetEventListingService } from "./get-event-listing.handler";

@Controller()
export class GetEventListingController {
    constructor(private readonly service: GetEventListingService) { }

    @Get('/:studio_uuid')
    async getEvents(
        @Param('studio_uuid') studioUuid: string,
        @Query('offset') offset?: number,
        @Query('limit') limit?: number,
    ) {
        const curr_limit = limit ?? Number(process.env.page_limit) ?? 10;
        const curr_offset = offset ?? Number(process.env.page_offset) ?? 0;

        const { data, totalDocuments } = await this.service.handle(studioUuid, curr_offset, curr_limit);

        return {
            message: "Events Fetched Successfully",
            data,
            limit: curr_limit,
            offset: curr_offset,
            totalDocuments,
        };
    }
}
