import { Body, Controller, Post, Req } from "@nestjs/common";
import { RegisterUserService } from "./register-user.handler";
import { RegisterUserDto } from "./register-user.dto";
import type { Request } from "express";

@Controller('/register')
export class RegisterUserController {
    constructor(private readonly registerUserService: RegisterUserService) { }

    @Post()
    async registerUser(@Req() req: Request, @Body() body: RegisterUserDto) {
        const { token, RegisteredUser } = await this.registerUserService.handle(req, body);

        return {
            message: "Registered User Suceess",
            access_token: token,
            user: {
                name: RegisteredUser.name,
                email: RegisteredUser.email,
                uuid: RegisteredUser.uuid,
                role: RegisteredUser.role,
            }
        }
    }
}