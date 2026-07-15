import { Module } from "@nestjs/common";
import { CronModule } from "../cron/cron.module";
import { EventOutboxEntryPublisherCommand } from "./command/outbox-entry-publisher/outbox-entry-publisher.command";
import { RabbitMQCommonModule } from "src/common/infrastructure/rabbit-mq/rabbit-mq.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { eventDataSource } from "../database/data-source";
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
            name: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
            useFactory: () => ({
                ...eventDataSource.options,
                retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 10,
                retryDelay: Number(process.env.DB_RETRY_DELAY) || 5000,
            }),
            dataSourceFactory: async (options) =>
                createTransactionalDataSource(
                    process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
                    options as DataSourceOptions,
                ),
        }),
    ],
    providers: [EventOutboxEntryPublisherCommand]
})
export class CommandModule { }
