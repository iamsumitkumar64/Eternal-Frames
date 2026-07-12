import { Injectable } from "@nestjs/common";
import { Between, DataSource, Not, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { SubscriptionUserEntity } from "../../domain/subscription_user/subscription_user.entity";

@Injectable()
export class SubscriptionUserRepository extends Repository<SubscriptionUserEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema')
        private readonly dataSource: DataSource,
    ) {
        super(SubscriptionUserEntity, dataSource.createEntityManager());
    }

    async createSubscriptionUser(body: Partial<SubscriptionUserEntity>) {
        const subscription = this.create(body);
        return await this.save(subscription);
    }

    async findByUserUuid(user_uuid: string) {
        const subscriptions = await this.findOne({
            where: {
                user_uuid: user_uuid,
            },
            relations: {
                plan: true,
                user: true,
            }
        });

        return subscriptions;
    }

    async getCurrentSubscriptionPlan(user_uuid: string) {
        const data = await this.findOne({
            where: {
                user_uuid
            },
            relations: {
                plan: { features: true }
            }
        });

        return data;
    }

    async deleteSubscriptionUser(uuid: string) {
        return await this.softDelete(uuid);
    }
}