import { Module } from "@nestjs/common";
import { GetEventByUuidController } from "./get-event-listing.controller";
import { GetEventByUuidService } from "./get-event-listing.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";

@Module({
    imports: [],
    controllers: [GetEventByUuidController],
    providers: [GetEventByUuidService, EventRepository],
    exports: [],
})
export class GetEventByUuidModule { }
