'use strict'

const { connectToRabbitMqForTest } = require('../dbs/init.rabbitmq');

describe('RabbitMQ Test', () => {
    it('should connect to RabbitMQ and send message to queue', async () => {
        const result = await connectToRabbitMqForTest();
        expect(result).toBeUndefined();
    });
});
