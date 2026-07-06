import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repository";
import { UpdateUserDto } from "./update-user.dto";
import type{ Request } from "express";

@Injectable()
export class UpdateUserService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async handle(req: Request, body: UpdateUserDto) {

    }
}