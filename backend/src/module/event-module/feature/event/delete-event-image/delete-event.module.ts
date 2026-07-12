import { Module } from "@nestjs/common";
import { DeleteEventImageController } from "./delete-event.controller";
import { DeleteEventImageService } from "./delete-event.handler";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";
import { EventImageRepository } from "src/module/event-module/infrastructure/repository/event-image.repository";

@Module({
    imports: [],
    controllers: [DeleteEventImageController],
    providers: [DeleteEventImageService, EventImageRepository, UserRepository],
    exports: [],
})

export class DeleteEventImageModule { }