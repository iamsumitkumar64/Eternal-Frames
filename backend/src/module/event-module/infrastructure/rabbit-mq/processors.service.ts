import { Injectable, Logger } from '@nestjs/common';
import { EventEventHandlerMap, EventEventPayloadMap, UserRegisteredMQEventPayload, UserUpdatedMQEventPayload, SubscriptionUserCreatedMQEventPayload } from './rabbit-mq.type';
import { InboxRepository } from '../repository/inbox.repository';
import { Transactional } from 'typeorm-transactional';
import { RegisterUserService } from '../../feature/auth/register-user/register-user.handler';
import { UpdateUserService } from '../../feature/auth/update-user/update-user.handler';
import { RegisterSubscriptionUserService } from '../../feature/subscription-user/register-subscription-user/register-subscription-user.handler';

@Injectable()
export class ProcessorsService {
    constructor(
        private readonly registerUserService: RegisterUserService,
        private readonly updateUserService: UpdateUserService,
        private readonly registerSubscriptionUserService: RegisterSubscriptionUserService,
        private readonly inboxRepository: InboxRepository,
    ) { }
    private readonly logger = new Logger(ProcessorsService.name);

    // Map event names to handlers
    public eventHandlerMap: EventEventHandlerMap = {
        'user.registered': [this.handleUserRegister],
        'user.updated': [this.handleUserUpdate],
        'subscription_user.created': [this.handleSubscriptionUserCreated]
    };

    @Transactional({
        connectionName: process.env.DB_POSTGRES_EVENT_SCHEMA || 'event_schema',
    })
    async executeHandler(eventName: string, payload: any, outbox_uuid: string) {
        const handlers = this.eventHandlerMap[eventName as keyof EventEventPayloadMap];
        if (!handlers || !handlers.length) {
            this.logger.debug(`No handler found for event: ${eventName} in Event Module`);
            return;
        }

        for (const handler of handlers) {
            const handlerName = handler.name;
            const alreadyProcessed = await this.inboxRepository.findByOutboxUuidAndHandlerName(outbox_uuid, handlerName);
            if (alreadyProcessed) {
                this.logger.debug(`Duplicated event: ${eventName} with handler: ${handlerName} in Event Module`);
                continue;
            }

            // Execute the handler
            await handler.call(this, payload, outbox_uuid, eventName);

            // Record successful processing in the inbox
            await this.inboxRepository.createEntry({
                outbox_uuid,
                event_name: eventName,
                handler_name: handlerName
            });
        }
    }

    async handleUserRegister(payload: UserRegisteredMQEventPayload) {
        await this.registerUserService.handle(payload);
    }

    async handleUserUpdate(payload: UserUpdatedMQEventPayload) {
        await this.updateUserService.handle(payload);
    }

    async handleSubscriptionUserCreated(payload: SubscriptionUserCreatedMQEventPayload) {
        await this.registerSubscriptionUserService.handle(payload);
    }
}
