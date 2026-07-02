import { Module } from "@nestjs/common";
import { GetEventListingController } from "./get-event-listing.controller";
import { GetEventListingService } from "./get-event-listing.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";

@Module({
    imports: [],
    controllers: [GetEventListingController],
    providers: [GetEventListingService, EventRepository],
    exports: [],
})
export class GetEventListingModule { }
