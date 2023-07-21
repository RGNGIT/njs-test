import amqplib from 'amqplib';
import _ from 'lodash';
import ChannelMessage from '../dto/chan.dto';
import logger from '../logger';

require('dotenv').config();

class MessageBroker {

  connection?: amqplib.Connection;
  channel?: amqplib.Channel;
  queues: any = {};

  constructor() {
    this.init();
  }

  async init() {
    this.connection = await amqplib.connect('amqp://localhost:' + process.env.RABBITMQ_PORT);
    this.channel = await this.connection.createChannel();
  }

  async send(queue: string, msg: ChannelMessage) {
    if (!this.connection) {
      await this.init();
    }
    await this.channel!.assertQueue(queue, { durable: true });
    this.channel!.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    logger.log('message', "Сообщение: " + JSON.stringify(msg), 'rabbit');
  }

  async subscribe(queue: string, handler: Function) {
    if (!this.connection) {
      await this.init();
    }
    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues![queue], h => h === handler);
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }
      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }

    await this.channel!.assertQueue(queue, { durable: true });
    this.queues[queue] = [handler];
    this.channel!.consume(
      queue,
      async (msg) => {
        const ack = _.once(() => this.channel!.ack(msg!));
        this.queues[queue].forEach((h: (arg0: amqplib.ConsumeMessage | null, arg1: () => void) => any) => h(msg, ack));
      }
    );
    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue: string, handler: Function) {
    _.pull(this.queues[queue], handler);
  }

}

export default new MessageBroker();