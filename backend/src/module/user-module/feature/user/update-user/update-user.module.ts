import { Module } from "@nestjs/common";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserService } from "./update-user.handler";

@Module({
    imports: [],
    controllers: [UpdateUserController],
    providers: [UpdateUserService],
    exports: [],
})
export class UpdateUserModule { }