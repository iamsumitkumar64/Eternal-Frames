import { Controller, Get, Query, Req } from "@nestjs/common";
import { GetEventListingService } from "./get-event-listing.handler";
import type { Request } from "express";

@Controller()
export class GetEventListingController {
    constructor(private readonly service: GetEventListingService) { }

    @Get()
    async getEvents(@Req() req: Request, @Query('limit') limit?: number, @Query('offset') offset?: number) {
        const curr_limit = limit ?? Number(process.env.page_limit) ?? 10;
        const curr_offset = offset ?? Number(process.env.page_offset) ?? 0;

        const { data, totalDocuments } = await this.service.handle(req.user.uuid, curr_offset, curr_limit);

        return {
            message: "Events Fetched Successfully",
            data,
            limit: curr_limit,
            offset: curr_offset,
            totalDocuments,
        };
    }
}
