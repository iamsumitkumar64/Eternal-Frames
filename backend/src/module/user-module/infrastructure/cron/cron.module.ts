import { Global, Module } from '@nestjs/common';
import { UserOutboxEntryPublisherCronService } from './outbox.entry.publisher/outbox.entry.publisher';
import { OutboxRepository } from '../repository/outbox.repository';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';

@Global()
@Module({
    providers: [
        UserOutboxEntryPublisherCronService,
        OutboxRepository,
        RabbitMQService,
    ],
    exports: [UserOutboxEntryPublisherCronService],
})
export class CronModule { }