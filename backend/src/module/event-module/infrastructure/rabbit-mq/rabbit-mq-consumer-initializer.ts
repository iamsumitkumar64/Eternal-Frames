import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { ProcessorsService } from './processors.service';
import { RabbitMQConsumerMessage } from '../../../../common/infrastructure/rabbit-mq/rabbit-mq.type';

@Injectable()
export class EventRabbitMQConsumerInitializer implements OnModuleInit {
    private readonly logger = new Logger(EventRabbitMQConsumerInitializer.name);

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly processorsService: ProcessorsService,
    ) { }

    async onModuleInit() {
        this.logger.log('Initializing Event RabbitMQ Consumer...');

        await this.rabbitMQService.consumeMessages<RabbitMQConsumerMessage<any>>(
            async (data) => {
                const { outbox_uuid, event_name, payload } = data;

                this.logger.log(`Processing event-> ${event_name} of outbox_uuid -> (${outbox_uuid})`);

                try {
                    await this.processorsService.executeHandler(event_name, payload, outbox_uuid);
                } catch (error) {
                    this.logger.error(`Error executing handler for event ${event_name}:`, error);
                    throw error;
                }
            },
        );
    }
}
