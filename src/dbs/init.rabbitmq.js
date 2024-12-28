'use strict'

const amqp = require('amqplib');

const connectionRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://admin:admin123@localhost');
        const channel = await connection.createChannel();
        return { connection, channel };
    } catch (error) {
        console.error(error);
    }
}

const closeConnectionRabbitMQ = async (connection) => {
    try {
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
    }
}
const connectToRabbitMqForTest = async () => {
    try {
        const { connection, channel } = await connectionRabbitMQ();
        const queue = 'test-queue';
        const message = 'TEST MESSAGE';
        await channel.assertQueue(queue, { durable: true });
        await channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Waiting for messages in ${queue}`);
        await channel.consume(queue, (message) => {
            console.log(`Received message: ${message.content.toString()}`);
            channel.ack(message);
        }, {
            ack: true
        });

        closeConnectionRabbitMQ(connection);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {connectionRabbitMQ, connectToRabbitMqForTest};