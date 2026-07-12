import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { GetEventByUuidService } from "./get-event-listing.handler";

@Controller()
export class GetEventByUuidController {
    constructor(private readonly service: GetEventByUuidService) { }

    @Get('/:event_uuid')
    async getEvents(@Param('event_uuid') event_uuid: string) {
        const { data } = await this.service.handle(event_uuid);

        return {
            message: "Event Fetched Successfully",
            data,
        };
    }
}
