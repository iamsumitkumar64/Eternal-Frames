import { Injectable } from "@nestjs/common";
import { DataSource, Not, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { SubscriptionPlanEntity } from "../../domain/subscription_plan/subscription_plan.entity";

@Injectable()
export class SubscriptionPlanRepository extends Repository<SubscriptionPlanEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema')
        private readonly dataSource: DataSource,
    ) {
        super(SubscriptionPlanEntity, dataSource.createEntityManager());
    }

    async getSubscriptionPlanListing(offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            relations: {
                features: true
            },
            order: {
                created_at: 'DESC'
            },
            skip: offset || Number(process.env.page_offset) || 0,
            take: limit || Number(process.env.page_limit) || 10
        });

        return { data, total };
    }
}