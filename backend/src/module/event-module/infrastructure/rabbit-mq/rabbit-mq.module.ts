import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { ProcessorsService } from './processors.service';
import { RegisterUserService } from '../../feature/auth/register-user/register-user.handler';
import { UpdateUserService } from '../../feature/auth/update-user/update-user.handler';
import { RegisterSubscriptionUserService } from '../../feature/subscription-user/register-subscription-user/register-subscription-user.handler';
import { InboxRepository } from '../repository/inbox.repository';
import { UserRepository } from '../repository/user.repository';
import { SubscriptionUserRepository } from '../repository/subscription-user.repository';
import { EventRabbitMQConsumerInitializer } from './rabbit-mq-consumer-initializer';

@Module({
    providers: [
        RabbitMQService,
        EventRabbitMQConsumerInitializer,
        ProcessorsService,
        RegisterUserService,
        UpdateUserService,
        RegisterSubscriptionUserService,
        InboxRepository,
        UserRepository,
        SubscriptionUserRepository,
    ],
    exports: [RabbitMQService, ProcessorsService],
})
export class EventRabbitMQModule { }
