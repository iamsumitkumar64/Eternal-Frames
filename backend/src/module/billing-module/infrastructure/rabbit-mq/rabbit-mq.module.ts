import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { ProcessorsService } from './processors.service';
import { BillingRabbitMQConsumerInitializer } from './rabbit-mq-consumer-initializer';
import { RegisterUserService } from '../../feature/auth/register-user/register-user.handler';
import { InboxRepository } from '../repository/inbox.repository';
import { UserRepository } from '../repository/user.repository';

@Module({
    providers: [
        RabbitMQService,
        BillingRabbitMQConsumerInitializer,
        ProcessorsService,
        RegisterUserService,
        InboxRepository,
        UserRepository,
    ],
    exports: [RabbitMQService, ProcessorsService],
})
export class BillingRabbitMQModule { }
