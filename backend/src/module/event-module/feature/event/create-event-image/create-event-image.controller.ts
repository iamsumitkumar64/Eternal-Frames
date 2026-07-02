import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateEventImageService } from "./create-event-image.handler";
import { CreateEventImageDto } from "./create-event-image.dto";
import type { Request } from "express";

@Controller()
export class CreateEventImageController {
    constructor(private readonly service: CreateEventImageService) { }

    @Post()
    async createEventImage(@Req() req: Request, @Body() body: CreateEventImageDto) {
        const event = await this.service.handle(req, body);

        return {
            message: "Event Image Created Successfully",
            event,
        };
    }
}
