import { Global, Module } from '@nestjs/common';
import { EventOutboxEntryPublisherCronService } from './outbox.entry.publisher/outbox.entry.publisher';
import { OutboxRepository } from '../repository/outbox.repository';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';

@Global()
@Module({
    providers: [
        EventOutboxEntryPublisherCronService,
        OutboxRepository,
        RabbitMQService,
    ],
    exports: [EventOutboxEntryPublisherCronService],
})
export class CronModule { }