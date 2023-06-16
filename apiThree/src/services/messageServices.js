const amqp = require('amqplib/callback_api');

class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            amqp.connect('amqp://localhost', (err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection = connection;
                    connection.createChannel((err, channel) => {
                        if (err) {
                            reject(err);
                        } else {
                            this.channel = channel;
                            resolve(channel);
                        }
                    });
                }
            });
        });
    }

    async createQueue(queueName) {
        return new Promise((resolve, reject) => {
            this.channel.assertQueue(queueName, { durable: true }, (err, ok) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ok);
                }
            });
        });
    }

    async publish(queueName, message) {
        const success = this.channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
        if (!success) {
            throw new Error(`Failed to publish message to ${queueName}`);
        }
    }

    async subscribe(queueName, callback) {
        this.channel.consume(queueName, async (msg) => {
            if (msg === null) {
                return;
            }

            try {
                await callback(msg.content.toString());
                this.channel.ack(msg);
            } catch (err) {
                this.channel.nack(msg);
            }
        });
    }

    async close() {
        await this.channel.close();
        await this.connection.close();
    }
}

module.exports = RabbitMQService;