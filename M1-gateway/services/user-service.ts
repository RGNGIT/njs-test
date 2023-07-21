import ChannelMessage from '../../dto/chan.dto';
import { ActionType } from '../../dto/enums';
import User from '../../dto/user.dto';
import BrokerInstance from '../../rabbit';

export default class UserService {
  async register(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await BrokerInstance.subscribe('user', (msg: any, ack: Function) => {
          const message = JSON.parse(Buffer.from(msg!.content).toString()) as ChannelMessage;
          if (message.TaskType == "Response") {
            ack();
            unsub();
            resolve(message.Message);
          }
        });
        await BrokerInstance.send('user', {
          TaskType: "Request",
          ActionType: ActionType.ADD,
          Message: user
        } as ChannelMessage);
      } catch (e) {
        reject(e);
      }
    });
  }
  async get(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await BrokerInstance.subscribe('user', (msg: any, ack: Function) => {
          const message = JSON.parse(Buffer.from(msg!.content).toString()) as ChannelMessage;
          if (message.TaskType == "Response") {
            ack();
            unsub();
            resolve(message.Message);
          }
        });
        await BrokerInstance.send('user', {
          TaskType: "Request",
          ActionType: ActionType.GET,
          Message: user
        } as ChannelMessage);
      } catch (e) {
        reject(e);
      }
    });
  }
  async edit(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await BrokerInstance.subscribe('user', (msg: any, ack: Function) => {
          const message = JSON.parse(Buffer.from(msg!.content).toString()) as ChannelMessage;
          if (message.TaskType == "Response") {
            ack();
            unsub();
            resolve(message.Message);
          }
        });
        await BrokerInstance.send('user', {
          TaskType: "Request",
          ActionType: ActionType.EDIT,
          Message: user
        } as ChannelMessage);
      } catch (e) {
        reject(e);
      }
    });
  }
  async delete(user: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await BrokerInstance.subscribe('user', (msg: any, ack: Function) => {
          const message = JSON.parse(Buffer.from(msg!.content).toString()) as ChannelMessage;
          if (message.TaskType == "Response") {
            ack();
            unsub();
            resolve(message.Message);
          }
        });
        await BrokerInstance.send('user', {
          TaskType: "Request",
          ActionType: ActionType.DELETE,
          Message: user
        } as ChannelMessage);
      } catch (e) {
        reject(e);
      }
    });
  }
}