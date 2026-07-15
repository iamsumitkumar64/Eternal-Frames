import { Module } from "@nestjs/common";
import { CronModule } from "../cron/cron.module";
import { BillingOutboxEntryPublisherCommand } from "./command/outbox-entry-publisher/outbox-entry-publisher.command";
import { RabbitMQCommonModule } from "src/common/infrastructure/rabbit-mq/rabbit-mq.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { billingDataSource } from "../database/data-source";
import { createTransactionalDataSource } from "src/common/infrastructure/services/typeorm.transactional";
import { DataSourceOptions } from "typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true
        }),
        CronModule,
        RabbitMQCommonModule,
        TypeOrmModule.forRootAsync({
            name: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
            useFactory: () => ({
                ...billingDataSource.options,
                retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 10,
                retryDelay: Number(process.env.DB_RETRY_DELAY) || 5000,
            }),
            dataSourceFactory: async (options) =>
                createTransactionalDataSource(
                    process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
                    options as DataSourceOptions,
                ),
        }),
    ],
    providers: [BillingOutboxEntryPublisherCommand]
})
export class CommandModule { }
