import { Body, Controller, Patch, Req } from "@nestjs/common";
import { UpdateUserService } from "./update-user.handler";
import { UpdateUserDto } from "./update-user.dto";
import type { Request } from "express";

@Controller()
export class UpdateUserController {

    constructor(
        private readonly updateUserService: UpdateUserService
    ) { }

    @Patch()
    async updateUser(@Req() req: Request, @Body() body: UpdateUserDto) {
        await this.updateUserService.handle(req, body);

        return {
            message: "User Updated Success"
        };
    }
}