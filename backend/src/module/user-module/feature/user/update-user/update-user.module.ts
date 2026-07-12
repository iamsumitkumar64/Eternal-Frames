import { Module } from "@nestjs/common";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserService } from "./update-user.handler";
import { OutboxRepository } from "src/module/user-module/infrastructure/repository/outbox.repository";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";

@Module({
    imports: [],
    controllers: [UpdateUserController],
    providers: [UpdateUserService, OutboxRepository, UserRepository],
    exports: [],
})
export class UpdateUserModule { }