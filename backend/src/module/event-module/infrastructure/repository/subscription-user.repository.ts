import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SubscriptionUserEntity } from "../../domain/subscription_user/subscription_user.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class SubscriptionUserRepository extends Repository<SubscriptionUserEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema')
        private readonly dataSource: DataSource,
    ) {
        super(SubscriptionUserEntity, dataSource.createEntityManager());
    }

    async createSubscriptionUser(body: Partial<SubscriptionUserEntity>) {
        const sub = this.create(body);
        return await this.save(sub);
    }

    async findByUuid(uuid: string) {
        const sub = await this.findOne({
            where: {
                uuid: uuid
            }
        });
        return sub;
    }

    async findByUserUuid(user_uuid: string) {
        const subscriptions = await this.findOne({
            where: {
                user_uuid: user_uuid,
            }
        });

        return subscriptions;
    }

    async findByStudioUuid(user_uuid: string) {
        const sub = await this.findOne({
            where: {
                user_uuid: user_uuid
            }
        });
        return sub;
    }

    async deleteSubscriptionUser(uuid: string) {
        return await this.softDelete(uuid);
    }

}
