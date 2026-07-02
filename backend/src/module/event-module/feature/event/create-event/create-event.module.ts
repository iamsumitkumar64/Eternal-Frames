import { Module } from "@nestjs/common";
import { CreateEventController } from "./create-event.controller";
import { CreateEventService } from "./create-event.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";

@Module({
    imports: [],
    controllers: [CreateEventController],
    providers: [CreateEventService, EventRepository],
    exports: [],
})
export class CreateEventModule { }
