import { Module } from "@nestjs/common";
import { DeleteEventController } from "./delete-event.controller";
import { DeleteEventService } from "./delete-event.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";

@Module({
    imports: [],
    controllers: [DeleteEventController],
    providers: [DeleteEventService, EventRepository, UserRepository],
    exports: [],
})

export class DeleteEventModule { }