//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { InboxEntity } from "../../domain/inbox/inbox.entity";
import { UserEntity } from "../../domain/user/user.entity";
import { OutboxEntity } from "../../domain/outbox/outbox.entity";
import { SubscriptionUserEntity } from "../../domain/subscription_user/subscription_user.entity";
import { EventEntity } from "../../domain/event/event.entity";
import { EventImagesEntity } from "../../domain/event_images/event_images.entity";
import { TagEntity } from "../../domain/tag/tag.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [
        UserEntity, InboxEntity, OutboxEntity,
        SubscriptionUserEntity, EventEntity, EventImagesEntity, TagEntity,
    ],
    schema: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    synchronize: false,
    migrations: ['dist/module/event-module/infrastructure/database/migrations/*{.ts,.js}'],
};

const eventDataSource = new DataSource(options);

export { eventDataSource, options };