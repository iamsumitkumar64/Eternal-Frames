import { Body, Controller, Delete, Param, Req } from "@nestjs/common";
import { DeleteEventImageService } from "./delete-event.handler";
import type { Request } from "express";

@Controller()
export class DeleteEventImageController {
    constructor(private readonly deleteEventService: DeleteEventImageService) { }

    @Delete('/:event_image_uuid')
    async deleteEventImage(@Req() req: Request, @Param('event_image_uuid') event_image_uuid: string) {
        await this.deleteEventService.handle(req, event_image_uuid);

        return {
            message: "Event Deleted Success"
        }
    }
}