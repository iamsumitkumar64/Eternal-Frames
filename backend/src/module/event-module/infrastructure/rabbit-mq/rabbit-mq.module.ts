import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { ProcessorsService } from './processors.service';
import { RegisterUserService } from '../../feature/auth/register-user/register-user.handler';
import { UpdateUserService } from '../../feature/user/update-user/update-user.handler';
import { RegisterSubscriptionUserService } from '../../feature/subscription-user/register-subscription-user/register-subscription-user.handler';
import { InboxRepository } from '../repository/inbox.repository';
import { UserRepository } from '../repository/user.repository';
import { SubscriptionUserRepository } from '../repository/subscription-user.repository';
import { EventRabbitMQConsumerInitializer } from './rabbit-mq-consumer-initializer';
import { CancelUserSubscriptionPlanService } from '../../feature/subscription-user/cancel-user-subscription/cancel-user-subscription.handler';
import { RenewUserSubscriptionPlanService } from '../../feature/subscription-user/renew-user-subscription/renew-user-subscription.handler';

@Module({
    providers: [
        RabbitMQService,
        EventRabbitMQConsumerInitializer,
        ProcessorsService,
        RegisterUserService,
        UpdateUserService,
        RegisterSubscriptionUserService,
        CancelUserSubscriptionPlanService,
        RenewUserSubscriptionPlanService,
        InboxRepository,
        UserRepository,
        SubscriptionUserRepository,
    ],
    exports: [],
})
export class EventRabbitMQModule { }
