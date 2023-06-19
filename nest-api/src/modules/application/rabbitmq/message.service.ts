import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { CRUDMessages } from 'src/shared/utils/message.enum';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService implements OnModuleInit {
    async onModuleInit() {
        await this.subscribeToMessages(this.queueName);
    }
    public queueName = 'default_queue';

    async publishMessage(dto: MessageDto) {
        const { queueName, text } = dto;
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URI);
            const channel = await connection.createChannel();
            const queue = queueName ?? this.queueName;
            await channel.assertQueue(queue, { durable: true });
            const message = text ?? '¡Hola, mundo!';
            const options = { mandatory: true };
            const result = await channel.sendToQueue(queue, Buffer.from(message), options);
            if (!result) {
                console.log(`No se pudo publicar el mensaje: ${message}`);
            }
            this.queueName = queue;
            console.log(this.queueName)
            await channel.close();
            await connection.close();
            return {
                statusCode: HttpStatus.OK,
                message: [CRUDMessages.GetSuccess],
                data: result,
            }
        } catch (error) {
            console.error(`Error al publicar el mensaje: ${error.message}`);
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async subscribeToMessages(queueName: string) {
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URI);
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName, { durable: true });
            const prefetchLimit = 1;
            await channel.prefetch(prefetchLimit);
            console.log(`Esperando mensajes en la cola ${queueName}`);

            const onMessage = async (message: amqp.ConsumeMessage | null) => {
                if (message) {
                    console.log(`Mensaje recibido: ${message.content.toString()}`);
                    await channel.ack(message);
                }
            };

            await channel.consume(this.queueName, onMessage, { noAck: false });
        } catch (error) {
            console.error(`Error al suscribirse a los mensajes: ${error.message}`);
        }
    }
}