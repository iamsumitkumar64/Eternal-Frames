import { Module } from "@nestjs/common";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserService } from "./update-user.handler";
import { OutboxRepository } from "src/module/user-module/infrastructure/repository/outbox.repository";

@Module({
    imports: [],
    controllers: [UpdateUserController],
    providers: [UpdateUserService, OutboxRepository],
    exports: [],
})
export class UpdateUserModule { }