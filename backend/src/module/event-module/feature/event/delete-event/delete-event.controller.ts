import { Body, Controller, Delete, Param, Req } from "@nestjs/common";
import { DeleteEventService } from "./delete-event.handler";
import type { Request } from "express";

@Controller()
export class DeleteEventController {
    constructor(private readonly deleteEventService: DeleteEventService) { }

    @Delete('/:uuid')
    async deleteEvent(@Req() req: Request, @Param('uuid') uuid: string) {
        await this.deleteEventService.handle(req, uuid);

        return {
            message: "Event Deleted Success"
        }
    }
}