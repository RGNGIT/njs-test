import Get from './get';
import Edit from './edit';
import Delete from './delete';
import Register from './register';
import ChannelMessage from '../../dto/chan.dto';
import BrokerInstance from '../../rabbit';
import { ActionType } from '../../dto/enums';
import User from '../../dto/user.dto';
import logger from '../../logger';

export async function userProcessor(msg: any, ack: Function) {
  try {
    const message = JSON.parse(Buffer.from(msg!.content).toString()) as ChannelMessage;
    if(message.TaskType == "Request") {
      const user = message.Message as User;
      switch(message.ActionType) {
        case ActionType.ADD:
          await Register(user);
          await BrokerInstance.send('user', {ActionType: ActionType.ADD, TaskType: "Response", Message: user});
          break;
        case ActionType.GET:
          await BrokerInstance.send('user', {ActionType: ActionType.GET, TaskType: "Response", Message: await Get(user.Username)});
          break;
        case ActionType.EDIT:
          await BrokerInstance.send('user', {ActionType: ActionType.GET, TaskType: "Response", Message: await Edit(user)});
          break;
        case ActionType.DELETE:
          await BrokerInstance.send('user', {ActionType: ActionType.GET, TaskType: "Response", Message: await Delete(user)});
          break;
      }
      ack();
    }
  } catch(e) {
    logger.log('error', (<Error>e).message, "M2-user-processor");
    ack();
  }
}