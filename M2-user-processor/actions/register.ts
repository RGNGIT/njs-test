import User from "../../dto/user.dto";
import logger from "../../logger";
import MongoAction from "../../mongo";

export default async (user: User): Promise<void> => {
  const action = new MongoAction();
  await action.insertOne('users', user);
  logger.log('message', `Юзер ${JSON.stringify(user)} добавлен в базу!`, 'M2-user-processor');
}