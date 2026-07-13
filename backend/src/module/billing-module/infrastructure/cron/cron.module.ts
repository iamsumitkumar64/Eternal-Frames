import { Global, Module } from '@nestjs/common';
import { BillingOutboxEntryPublisherCronService } from './outbox.entry.publisher/outbox.entry.publisher';
import { OutboxRepository } from '../repository/outbox.repository';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';

@Global()
@Module({
    providers: [
        BillingOutboxEntryPublisherCronService,
        OutboxRepository,
        RabbitMQService,
    ],
    exports: [BillingOutboxEntryPublisherCronService],
})
export class CronModule { }