import { BadRequestException, Injectable, } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { UserRepository } from "src/module/billing-module/infrastructure/repository/user.repository";
import type { UserRegisteredMQEventPayload } from "src/module/billing-module/infrastructure/rabbit-mq/rabbit-mq.type";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
    })
    async handle(payload: UserRegisteredMQEventPayload) {
        const isUserExists = await this.repository.findByEmail(payload.email);
        if (isUserExists) {
            console.warn(`Duplicate skipped: ${isUserExists.email}`);
            return;
        }

        await this.repository.register(payload);
        return;
    }
}