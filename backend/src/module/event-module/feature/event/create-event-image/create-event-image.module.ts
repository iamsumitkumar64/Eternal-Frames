import { Module } from "@nestjs/common";
import { CreateEventImageController } from "./create-event-image.controller";
import { CreateEventImageService } from "./create-event-image.handler";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";
import { UserRepository } from "src/module/event-module/infrastructure/repository/user.repository";
import { TagRepository } from "src/module/event-module/infrastructure/repository/tag.repository";
import { EventImageRepository } from "src/module/event-module/infrastructure/repository/event-image.repository";

@Module({
    imports: [],
    controllers: [CreateEventImageController],
    providers: [
        CreateEventImageService,
        EventRepository,
        UserRepository,
        TagRepository,
        EventImageRepository
    ],
    exports: [],
})
export class CreateEventImageModule { }
