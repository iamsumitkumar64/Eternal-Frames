import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateEventService } from "./create-event.handler";
import { CreateEventDto } from "./create-event.dto";
import type { Request } from "express";

@Controller()
export class CreateEventController {
    constructor(private readonly service: CreateEventService) { }

    @Post()
    async createEvent(@Req() req: Request, @Body() body: CreateEventDto) {
        const event = await this.service.handle(req, body);

        return {
            message: "Event Created Successfully",
            event,
        };
    }
}
