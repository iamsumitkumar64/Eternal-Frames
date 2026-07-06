import { Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { UserRepository } from "src/module/billing-module/infrastructure/repository/user.repository";
import type { UserUpdatedMQEventPayload } from "src/module/billing-module/infrastructure/rabbit-mq/rabbit-mq.type";

@Injectable()
export class UpdateUserService {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
    })
    async handle(payload: UserUpdatedMQEventPayload) {
        await this.repository.update({ uuid: payload.uuid }, {
            name: payload.name,
            email: payload.email,
        });
        return;
    }
}
