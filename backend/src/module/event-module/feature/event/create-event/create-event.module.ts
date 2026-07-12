import { Module } from "@nestjs/common";
import { CreateEventController } from "./create-event.controller";
import { CreateEventService } from "./create-event.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { UserRepository } from "src/module/event-module/infrastructure/repository/user.repository";
import { SubscriptionUserRepository } from "src/module/event-module/infrastructure/repository/subscription-user.repository";

@Module({
    imports: [],
    controllers: [CreateEventController],
    providers: [CreateEventService, EventRepository, UserRepository, SubscriptionUserRepository],
    exports: [],
})
export class CreateEventModule { }
