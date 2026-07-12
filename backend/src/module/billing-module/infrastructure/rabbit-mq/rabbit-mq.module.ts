import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { ProcessorsService } from './processors.service';
import { BillingRabbitMQConsumerInitializer } from './rabbit-mq-consumer-initializer';
import { RegisterUserService } from '../../feature/auth/register-user/register-user.handler';
import { UpdateUserService } from '../../feature/user/update-user/update-user.handler';
import { InboxRepository } from '../repository/inbox.repository';
import { UserRepository } from '../repository/user.repository';

@Module({
    providers: [
        RabbitMQService,
        BillingRabbitMQConsumerInitializer,
        ProcessorsService,
        RegisterUserService,
        UpdateUserService,
        InboxRepository,
        UserRepository,
    ],
    exports: [],
})
export class BillingRabbitMQModule { }
