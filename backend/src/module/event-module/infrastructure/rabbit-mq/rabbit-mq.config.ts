import { ExchangeTypeEnum } from "../../../../common/infrastruture/rabbit-mq/rabbit-mq.type";

export const eventRabbitMQConfig = {
    queueName: 'event.queue',
    exchanges: [
        { name: 'user.exchange', type: ExchangeTypeEnum.FANOUT, routingKey: '' },
        { name: 'billing.exchange', type: ExchangeTypeEnum.FANOUT, routingKey: '' },
    ]
};
