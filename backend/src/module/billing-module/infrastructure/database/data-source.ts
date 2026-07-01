//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { InboxEntity } from "../../domain/inbox/inbox.entity";
import { UserEntity } from "../../domain/user/user.entity";
import { OutboxEntity } from "../../domain/outbox/outbox.entity";
import { SubscriptionPlanEntity } from "../../domain/subscription_plan/subscription_plan.entity";
import { SubscriptionFeatureEntity } from "../../domain/subscription_feature/subscription_feature.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [
        UserEntity, InboxEntity, OutboxEntity,
        SubscriptionPlanEntity, SubscriptionFeatureEntity,
    ],
    schema: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
    synchronize: false,
    migrations: ['dist/module/billing-module/infrastructure/database/migrations/*{.ts,.js}'],
};

const billingDataSource = new DataSource(options);

export { billingDataSource, options };