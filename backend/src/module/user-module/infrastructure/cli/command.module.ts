import { Module } from "@nestjs/common";
import { CronModule } from "../cron/cron.module";
import { UserOutboxEntryPublisherCommand } from "./command/outbox-entry-publisher/outbox-entry-publisher.command";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userDataSource } from "../database/data-source";
import { createTransactionalDataSource } from "src/common/infrastructure/services/typeorm.transactional";
import { DataSourceOptions } from "typeorm";
import { RabbitMQCommonModule } from "src/common/infrastructure/rabbit-mq/rabbit-mq.module";

@Module({
    imports: [
        CronModule,
        RabbitMQCommonModule,
        TypeOrmModule.forRootAsync({
            name: process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema',
            useFactory: () => ({
                ...userDataSource.options,
                retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 10,
                retryDelay: Number(process.env.DB_RETRY_DELAY) || 5000,
            }),
            dataSourceFactory: async (options) =>
                createTransactionalDataSource(
                    process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema',
                    options as DataSourceOptions,
                ),
        }),
    ],
    providers: [UserOutboxEntryPublisherCommand]
})
export class CommandModule { }
