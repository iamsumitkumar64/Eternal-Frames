import { ExchangeTypeEnum } from "../../../../common/infrastructure/rabbit-mq/rabbit-mq.type";

export const userRabbitMQConfig = {
    queueName: 'user.queue',
    exchanges: [
        { name: 'user.exchange', type: ExchangeTypeEnum.FANOUT, routingKey: '' },
    ]
};
